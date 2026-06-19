const sql = require("../db");

exports.scheduleTrip = async (req, res) => {
  let transaction;
  try {
    const { routeId, busId, departureDateTime, recurrenceCount = 1 } = req.body;

    if (!routeId || !departureDateTime) {
      return res.status(400).json({
        error: "Route and Departure Date & Time are required",
      });
    }

    const runs = Number(recurrenceCount);
    if (runs < 1 || runs > 31 || isNaN(runs)) {
      return res.status(400).json({
        error: "Recurrence count must be a number between 1 and 31 days.",
      });
    }

    if (runs === 1 && !busId) {
      return res.status(400).json({
        error: "Please select a bus for the scheduled trip.",
      });
    }

    const startBase = new Date(departureDateTime);

    const routeReq = new sql.Request();
    routeReq.input("routeId", sql.Int, routeId);

    const routeResult = await routeReq.query(`
      SELECT totalPrice, startCity FROM Routes WHERE id = @routeId
    `);

    if (routeResult.recordset.length === 0) {
      return res.status(404).json({ error: "Route not found." });
    }

    const { totalPrice, startCity } = routeResult.recordset[0];

    const stopsResult = await routeReq.query(`
      SELECT arrivalTime, departureTime 
      FROM RouteStops 
      WHERE routeId = @routeId 
      ORDER BY stopOrder ASC
    `);

    if (stopsResult.recordset.length < 2) {
      return res.status(400).json({
        error:
          "Route must have at least a start stop and an end stop to calculate duration.",
      });
    }

    const stops = stopsResult.recordset;
    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];

    let travelDurationMs = 0;
    if (firstStop.departureTime && lastStop.arrivalTime) {
      const depDate = new Date(firstStop.departureTime);
      const arrDate = new Date(lastStop.arrivalTime);
      if (!isNaN(depDate.getTime()) && !isNaN(arrDate.getTime())) {
        travelDurationMs = arrDate.getTime() - depDate.getTime();
      }
    }

    if (travelDurationMs <= 0 || isNaN(travelDurationMs)) {
      travelDurationMs = 4 * 60 * 60 * 1000;
    }

    const busCheckReq = new sql.Request();
    busCheckReq.input("busId", sql.Int, busId);
    const busCheck = await busCheckReq.query(`
      SELECT registrationExpiryDate, availableFrom, available 
      FROM Buses WHERE id = @busId
    `);

    if (busCheck.recordset.length === 0 && runs === 1) {
      return res.status(404).json({ error: "Bus not found." });
    }

    const bus = busCheck.recordset[0];

    transaction = new sql.Transaction();
    await transaction.begin();

    for (let i = 0; i < runs; i++) {
      const currentStart = new Date(
        startBase.getTime() + i * 24 * 60 * 60 * 1000,
      );
      const currentEnd = new Date(currentStart.getTime() + travelDurationMs);
      const displayDateStr = currentStart.toLocaleDateString();

      let assignedBusId = null;

      if (runs === 1 && busId) {
        // Проверка на временска достапност на автобусот
        const isBusAvailable =
          bus.available === "Yes" ||
          (bus.availableFrom && new Date(bus.availableFrom) <= currentStart) ||
          EXISTS_IN_TRIPS; // Ќе се провери преку Trips подолу

        if (
          bus.registrationExpiryDate &&
          new Date(bus.registrationExpiryDate) < currentEnd
        ) {
          throw new Error(
            `Cannot schedule trip for ${displayDateStr}. Bus registration will be expired by the end of this trip.`,
          );
        }

        // Проверка на физичка локација на автобусот пред поаѓање само ако имало претходно патување ИСТОТ ДЕН
        const locCheckReq = new sql.Request(transaction);
        locCheckReq.input("busId", sql.Int, busId);
        locCheckReq.input("start", sql.DateTime, currentStart);
        const lastLocRes = await locCheckReq.query(`
          SELECT TOP 1 r.endCity 
          FROM Trips t
          INNER JOIN Routes r ON t.routeId = r.id
          WHERE t.busId = @busId 
            AND t.arrivalDateTime <= @start
            AND CAST(t.arrivalDateTime AS DATE) = CAST(@start AS DATE) -- Само за истиот ден
          ORDER BY t.arrivalDateTime DESC
        `);

        if (lastLocRes.recordset.length > 0) {
          const lastCity = lastLocRes.recordset[0].endCity;
          if (lastCity.toLowerCase() !== startCity.toLowerCase()) {
            throw new Error(
              `Локациски конфликт на ден ${displayDateStr}! Автобусот моментално е во ${lastCity}, а оваа рута почнува од ${startCity}.`,
            );
          }
        }

        const checkConflictReq = new sql.Request(transaction);
        checkConflictReq.input("busId", sql.Int, busId);
        checkConflictReq.input("start", sql.DateTime, currentStart);
        checkConflictReq.input("end", sql.DateTime, currentEnd);

        const conflictTrips = await checkConflictReq.query(`
          SELECT id FROM Trips
          WHERE busId = @busId
            AND ((departureDateTime <= @start AND arrivalDateTime >= @start)
             OR (departureDateTime <= @end AND arrivalDateTime >= @end)
             OR (@start <= departureDateTime AND @end >= departureDateTime))  
        `);

        if (conflictTrips.recordset.length > 0) {
          throw new Error(
            `Bus is already busy with another trip on ${displayDateStr}.`,
          );
        }

        assignedBusId = busId;
      } else {
        // Автоматска распределба на СЛУЧАЕН слободен автобус кој се наоѓа на точната почетна локација (ако има претходно возење истиот ден)
        const findBusReq = new sql.Request(transaction);
        findBusReq.input("start", sql.DateTime, currentStart);
        findBusReq.input("end", sql.DateTime, currentEnd);
        findBusReq.input("startCity", sql.NVarChar, startCity);

        const availableBusesResult = await findBusReq.query(`
          SELECT id, busNumber, plateNumber 
          FROM Buses b
          WHERE (
              b.available = 'Yes'
              OR b.availableFrom <= @start
              -- Ако No статусот е поставен автоматски од патување, го игнорираме за идни денови бидејќи Trips веќе пресметува преклоп
              OR EXISTS (SELECT 1 FROM Trips WHERE busId = b.id AND arrivalDateTime = b.availableFrom)
            )
            AND (
              b.availableFrom IS NULL 
              OR b.availableFrom <= @start 
              OR EXISTS (SELECT 1 FROM Trips WHERE busId = b.id AND arrivalDateTime = b.availableFrom)
            )
            AND (registrationExpiryDate IS NULL OR registrationExpiryDate >= @end)
            AND id NOT IN (
              SELECT busId FROM Trips
              WHERE (departureDateTime <= @end AND arrivalDateTime >= @start)
            )
            -- Проверка на физичка локација на истиот ден
            AND (
              NOT EXISTS (
                SELECT 1 FROM Trips 
                WHERE busId = b.id AND arrivalDateTime <= @start
                  AND CAST(arrivalDateTime AS DATE) = CAST(@start AS DATE)
              )
              OR 
              (
                SELECT TOP 1 r2.endCity 
                FROM Trips t2
                INNER JOIN Routes r2 ON t2.routeId = r2.id
                WHERE t2.busId = b.id AND t2.arrivalDateTime <= @start
                  AND CAST(t2.arrivalDateTime AS DATE) = CAST(@start AS DATE)
                ORDER BY t2.arrivalDateTime DESC
              ) = @startCity
            )
        `);

        const availableBuses = availableBusesResult.recordset;

        if (availableBuses.length === 0) {
          throw new Error(
            `Нема слободен автобус на локацијата ${startCity} за датумот: ${displayDateStr}.`,
          );
        }

        const randomBus =
          availableBuses[Math.floor(Math.random() * availableBuses.length)];
        assignedBusId = randomBus.id;
      }

      const request = new sql.Request(transaction);
      request.input("routeId", sql.Int, routeId);
      request.input("busId", sql.Int, assignedBusId);
      request.input("basePrice", sql.Decimal(10, 2), totalPrice);
      request.input("departureDateTime", sql.DateTime, currentStart);
      request.input("arrivalDateTime", sql.DateTime, currentEnd);

      await request.query(`
        INSERT INTO Trips (routeId, busId, departureDateTime, arrivalDateTime, basePrice)
        VALUES (@routeId, @busId, @departureDateTime, @arrivalDateTime, @basePrice)
      `);

      const updateBusReq = new sql.Request(transaction);
      updateBusReq.input("busId", sql.Int, assignedBusId);
      updateBusReq.input("arrivalDateTime", sql.DateTime, currentEnd);
      await updateBusReq.query(`
        UPDATE Buses
        SET available = 'No',
            availableFrom = @arrivalDateTime
        WHERE id = @busId
      `);
    }

    await transaction.commit();
    return res.status(201).json({
      message:
        runs > 1
          ? `Successfully scheduled ${runs} consecutive trips! Buses have been automatically occupied.`
          : "Trip scheduled successfully! Bus status updated to busy.",
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAvailableBuses = async (req, res) => {
  try {
    const { routeId, departureDateTime } = req.body;

    if (!routeId || !departureDateTime) {
      return res.status(400).json({
        message:
          "Route and departure date-time are required to calculate bus availability",
      });
    }

    const start = new Date(departureDateTime);

    const routeReq = new sql.Request();
    routeReq.input("routeId", sql.Int, routeId);
    const routeInfo = await routeReq.query(`
      SELECT startCity FROM Routes WHERE id = @routeId
    `);

    if (routeInfo.recordset.length === 0) {
      return res.status(404).json({ error: "Route not found." });
    }

    const startCity = routeInfo.recordset[0].startCity;

    const stopsResult = await routeReq.query(`
      SELECT arrivalTime, departureTime FROM RouteStops 
      WHERE routeId = @routeId 
      ORDER BY stopOrder ASC
    `);

    if (stopsResult.recordset.length < 2) {
      return res
        .status(400)
        .json({ error: "Route has insufficient stops to calculate duration." });
    }

    const stops = stopsResult.recordset;
    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];

    let travelDurationMs = 0;
    if (firstStop.departureTime && lastStop.arrivalTime) {
      const depDate = new Date(firstStop.departureTime);
      const arrDate = new Date(lastStop.arrivalTime);
      if (!isNaN(depDate.getTime()) && !isNaN(arrDate.getTime())) {
        travelDurationMs = arrDate.getTime() - depDate.getTime();
      }
    }

    if (travelDurationMs <= 0 || isNaN(travelDurationMs)) {
      travelDurationMs = 4 * 60 * 60 * 1000;
    }

    const end = new Date(start.getTime() + travelDurationMs);

    const request = new sql.Request();
    request.input("start", sql.DateTime, start);
    request.input("end", sql.DateTime, end);
    request.input("startCity", sql.NVarChar, startCity);

    const buses = await request.query(`
      SELECT id, busNumber, plateNumber, totalSeats FROM Buses
      WHERE (
          available = 'Yes' 
          OR availableFrom <= @start
          OR EXISTS (SELECT 1 FROM Trips WHERE busId = id AND arrivalDateTime = availableFrom)
        )
        AND (
          availableFrom IS NULL 
          OR availableFrom <= @start
          OR EXISTS (SELECT 1 FROM Trips WHERE busId = id AND arrivalDateTime = availableFrom)
        )
        AND (registrationExpiryDate IS NULL OR registrationExpiryDate >= @end)
        AND id NOT IN (
          SELECT busId FROM Trips
          WHERE (departureDateTime <= @end AND arrivalDateTime >= @start)
        )
        AND (
          NOT EXISTS (
            SELECT 1 FROM Trips 
            WHERE busId = id AND arrivalDateTime <= @start
              AND CAST(arrivalDateTime AS DATE) = CAST(@start AS DATE)
          )
          OR 
          (
            SELECT TOP 1 r2.endCity 
            FROM Trips t2
            INNER JOIN Routes r2 ON t2.routeId = r2.id
            WHERE t2.busId = id AND t2.arrivalDateTime <= @start
              AND CAST(t2.arrivalDateTime AS DATE) = CAST(@start AS DATE)
            ORDER BY t2.arrivalDateTime DESC
          ) = @startCity
        )
    `);

    res.status(200).json(buses.recordset);
  } catch (error) {
    res.status(500).json({
      message: "Failed getting available buses. " + error.message,
    });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const getTripsRequest = new sql.Request();
    const trips = await getTripsRequest.query(`
      SELECT 
          t.id,
          t.departureDateTime,
          t.arrivalDateTime,
          t.basePrice,
          r.startCity + ' - ' + r.endCity AS routeName,
          b.plateNumber,
          b.busNumber
      FROM Trips t
      INNER JOIN Routes r ON t.routeId = r.id
      INNER JOIN Buses b ON t.busId = b.id
      ORDER BY t.departureDateTime ASC
    `);

    return res.status(200).json({
      trips: trips.recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed retrieving trips. " + error.message,
    });
  }
};

exports.getTripsStops = async (req, res) => {
  try {
    const { routeId } = req.params;
    const request = new sql.Request();
    request.input("routeId", sql.Int, routeId);

    const result = await request.query(`
      SELECT id, routeId, cityName, stopOrder, arrivalTime, departureTime, platform, priceFromStart
      FROM RouteStops
      WHERE routeId = @routeId
      ORDER BY stopOrder ASC
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Грешка во getTripsStops:", error.message);
    res.status(500).json({ error: error.message });
  }
};
