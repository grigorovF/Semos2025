const sql = require("../db");

exports.createRoute = async (req, res) => {
  let transaction;
  try {
    const { startCity, endCity, totalPrice, stops } = req.body;

    if (!startCity || !endCity || !totalPrice    ) {
      return res.status(400).json({
        error: "Cities are required",
      });
    }

    const routeName = `${startCity} - ${endCity}`;

    transaction = new sql.Transaction();
    await transaction.begin();

    const routeRequest = new sql.Request(transaction);
    routeRequest.input("routeName", sql.NVarChar, routeName);
    routeRequest.input("startCity", sql.NVarChar, startCity);
    routeRequest.input("endCity", sql.NVarChar, endCity);
    routeRequest.input("totalPrice", sql.Decimal(10, 2), totalPrice);
    

    const addRouteResult = await routeRequest.query(`
      INSERT INTO Routes (routeName, startCity, endCity, totalPrice, createdAt)
      OUTPUT INSERTED.id
      VALUES (@routeName, @startCity, @endCity, @totalPrice GETDATE())
    `);

    const routeId = addRouteResult.recordset[0].id;

    if (stops && stops.length > 0) {
      for (const stop of stops) {
        const stopRequest = new sql.Request(transaction);

        stopRequest.input("routeId", sql.Int, routeId);
        stopRequest.input("cityName", sql.NVarChar, stop.cityName);
        stopRequest.input("stopOrder", sql.Int, stop.stopOrder);

        stopRequest.input(
          "arrivalTime",
          sql.DateTime,
          stop.arrivalTime && !isNaN(new Date(stop.arrivalTime))
            ? new Date(stop.arrivalTime)
            : null,
        );

        stopRequest.input(
          "departureTime",
          sql.DateTime,
          stop.departureTime && !isNaN(new Date(stop.departureTime))
            ? new Date(stop.departureTime)
            : null,
        );

        stopRequest.input("platform", sql.NVarChar, stop.platform);

        await stopRequest.query(`
      INSERT INTO RouteStops (routeId, cityName, stopOrder, arrivalTime, departureTime, platform)
      VALUES (@routeId, @cityName, @stopOrder, @arrivalTime, @departureTime, @platform)
    `);
      }
    }
    await transaction.commit();
    res.status(201).json({
      message: "Route created successfully",
      routeName,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT r.*, 
      (SELECT rs.* FROM RouteStops rs WHERE rs.routeId = r.id ORDER BY rs.stopOrder FOR JSON PATH) AS stops
      FROM Routes r
    `);

    const formattedRoutes = result.recordset.map((row) => ({
      ...row,
      stops: JSON.parse(row.stops || "[]"),
    }));

    res.status(200).json(formattedRoutes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoute = async (req, res) => {
  let transaction;
  try {
    const { id } = req.params;
    const { startCity, endCity, totalPrice, stops } = req.body;

    const routeName = `${startCity} - ${endCity}`;

    transaction = new sql.Transaction();
    await transaction.begin();

    const updateRouteReq = new sql.Request(transaction);
    updateRouteReq.input("id", sql.Int, id);
    updateRouteReq.input("routeName", sql.NVarChar, routeName);
    updateRouteReq.input("startCity", sql.NVarChar, startCity);
    updateRouteReq.input("endCity", sql.NVarChar, endCity);
    updateRouteReq.input("totalPrice", sql.Decimal(10, 2), totalPrice);

    await updateRouteReq.query(`
      UPDATE Routes 
      SET routeName = @routeName, startCity = @startCity, endCity = @endCity, totalPrice = @totalPrice
      WHERE id = @id
    `);

    const deleteStopsReq = new sql.Request(transaction);
    deleteStopsReq.input("routeId", sql.Int, id);
    await deleteStopsReq.query(
      "DELETE FROM RouteStops WHERE routeId = @routeId",
    );

    if (stops && stops.length > 0) {
      for (const stop of stops) {
        const stopReq = new sql.Request(transaction);
        stopReq.input("routeId", sql.Int, id);
        stopReq.input("cityName", sql.NVarChar, stop.cityName);
        stopReq.input("stopOrder", sql.Int, stop.stopOrder);
        stopReq.input(
          "arrivalTime",
          sql.DateTime,
          stop.arrivalTime ? new Date(stop.arrivalTime) : null,
        );
        stopReq.input(
          "departureTime",
          sql.DateTime,
          stop.departureTime ? new Date(stop.departureTime) : null,
        );
        stopReq.input("platform", sql.NVarChar, stop.platform);

        await stopReq.query(`
          INSERT INTO RouteStops (routeId, cityName, stopOrder, arrivalTime, departureTime, platform)
          VALUES (@routeId, @cityName, @stopOrder, @arrivalTime, @departureTime, @platform)
        `);
      }
    }

    await transaction.commit();
    res.status(200).json({ message: "Route updated successfully." });
  } catch (error) {
    if (transaction) await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const { routeId } = req.params;
    const request = new sql.Request();
    request.input("routeId", sql.Int, routeId);
    await request.query("DELETE FROM Routes WHERE id = @routeId");
    return res.status(200).json({
      message: "Route successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.scheduleTrip = async (req, res) => {
  try {
    const { routeId, busId, departureDateTime, arrivalDateTime, basePrice } =
      req.body;

    const start = new Date(departureDateTime);
    const end = new Date(arrivalDateTime);

    const checkBusReq = new sql.Request();
    checkBusReq.input("busId", sql.Int, busId);
    checkBusReq.input("start", sql.DateTime, start);
    checkBusReq.input("end", sql.DateTime, end);

    const conflictingTrips = await checkBusReq.query(`
      SELECT id FROM Trips
      WHERE busId = @busId
        AND ((departureDateTime <= @start AND arrivalDateTime >= @start)
         OR (departureDateTime <= @end AND arrivalDateTime >= @end)
         OR (@start <= departureDateTime AND @end >= departureDateTime))
    `);

    if (conflictingTrips.recordset.length > 0) {
      return res.status(400).json({
        error:
          "This bus is already scheduled for another trip during this time period.",
      });
    }

    const request = new sql.Request();
    request.input("routeId", sql.Int, routeId);
    request.input("busId", sql.Int, busId);
    request.input("departure", sql.DateTime, start);
    request.input("arrival", sql.DateTime, end);
    request.input("price", sql.Decimal(10, 2), basePrice);

    await request.query(`
      INSERT INTO Trips (routeId, busId, departureDateTime, arrivalDateTime, basePrice)
      VALUES (@routeId, @busId, @departure, @arrival, @price)
    `);

    res.status(201).json({ message: "Trip scheduled successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableBusesForPeriod = async (req, res) => {
  try {
    const { departureDateTime, arrivalDateTime } = req.query;

    if (!departureDateTime || !arrivalDateTime) {
      return res
        .status(400)
        .json({ error: "Both departure and arrival dates are required." });
    }

    const start = new Date(departureDateTime);
    const end = new Date(arrivalDateTime);

    const request = new sql.Request();
    request.input("start", sql.DateTime, start);
    request.input("end", sql.DateTime, end);

    const buses = await request.query(`
      SELECT * FROM Buses b
      WHERE b.available = 'Yes'
        AND b.id NOT IN (
          SELECT busId FROM Trips
          WHERE (departureDateTime <= @start AND arrivalDateTime >= @start)
             OR (departureDateTime <= @end AND arrivalDateTime >= @end)
             OR (@start <= departureDateTime AND @end >= departureDateTime)
        )
    `);

    res.status(200).json(buses.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
