const sql = require("../db");

// 1. ЗАКАЖУВАЊЕ НА ПАТУВАЊЕ
exports.scheduleTrip = async (req, res) => {
  try {
    const { routeId, busId, departureDateTime, arrivalDateTime, basePrice } =
      req.body;

    if (
      !routeId ||
      !busId ||
      !departureDateTime ||
      !arrivalDateTime ||
      !basePrice
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const start = new Date(departureDateTime);
    const end = new Date(arrivalDateTime);

    const checkBusReq = new sql.Request();
    // Внимавај: Тука беше пишано "budId" наместо "busId"
    checkBusReq.input("busId", sql.Int, busId);
    checkBusReq.input("start", sql.DateTime, start);
    checkBusReq.input("end", sql.DateTime, end);

    // ПОПРАВЕНО: Додадени коси црти '@' кај променливите и поправени оператори '>='
    const conflictTrips = await checkBusReq.query(`
            SELECT id FROM Trips
            WHERE busId = @busId
              AND ((departureDateTime <= @start AND arrivalDateTime >= @start)
               OR (departureDateTime <= @end AND arrivalDateTime >= @end)
               OR (@start <= departureDateTime AND @end >= departureDateTime))  
        `);

    if (conflictTrips.recordset.length > 0) {
      return res.status(400).json({
        error: "This bus is already busy during this period.",
      });
    }

    const request = new sql.Request();
    request.input("routeId", sql.Int, routeId);
    request.input("busId", sql.Int, busId);
    request.input("basePrice", sql.Decimal(10, 2), basePrice);
    request.input("departureDateTime", sql.DateTime, start);
    request.input("arrivalDateTime", sql.DateTime, end);

    await request.query(`
            INSERT INTO Trips (routeId, busId, departureDateTime, arrivalDateTime, basePrice)
            VALUES (@routeId, @busId, @departureDateTime, @arrivalDateTime, @basePrice)
        `);

    // ЗАБЕЛЕШКА: Логиката за UPDATE на Buses е избришана бидејќи зафатеноста
    // се следи динамички преку табелата Trips по датуми.

    return res.status(201).json({
      message: "Trip scheduled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed scheduling trip. " + error.message,
    });
  }
};

exports.getAvailableBuses = async (req, res) => {
  try {
    const { departureDateTime, arrivalDateTime } = req.body;

    if (!departureDateTime || !arrivalDateTime) {
      return res.status(400).json({
        message: "Both dates are required",
      });
    }
    const start = new Date(departureDateTime);
    const end = new Date(arrivalDateTime);

    const request = new sql.Request();
    request.input("start", sql.DateTime, start);
    request.input("end", sql.DateTime, end);

    const buses = await request.query(`
            SELECT id, plateNumber, totalSeats FROM Buses
            WHERE available = 'Yes'
              AND id NOT IN (
                SELECT busId FROM Trips
                WHERE (departureDateTime <= @start AND arrivalDateTime >= @start)
                   OR (departureDateTime <= @end AND arrivalDateTime >= @end)
                   OR (@start <= departureDateTime AND @end >= departureDateTime)
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

    // ПОПРАВЕНО: Враќање на recordset во точен JSON формат
    return res.status(200).json({
      buses: trips.recordset,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed retrieving trips. " + error.message,
    });
  }
};
