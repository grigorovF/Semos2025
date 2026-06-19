const sql = require("../db");

exports.createRoute = async (req, res) => {
  let transaction;
  try {
    const { startCity, endCity, totalPrice, stops } = req.body;

    if (!startCity || !endCity || !totalPrice) {
      return res.status(400).json({
        error: "Cities and total price are required",
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
      VALUES (@routeName, @startCity, @endCity, @totalPrice, GETDATE())
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
        stopRequest.input(
          "priceFromStart",
          sql.Decimal(10, 2),
          stop.priceFromStart || 0.0,
        );

        await stopRequest.query(`
          INSERT INTO RouteStops (routeId, cityName, stopOrder, arrivalTime, departureTime, platform, priceFromStart)
          VALUES (@routeId, @cityName, @stopOrder, @arrivalTime, @departureTime, @platform, @priceFromStart)
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
      (
        SELECT rs.*
        FROM RouteStops rs
        WHERE rs.routeId = r.id
        ORDER BY rs.stopOrder
        FOR JSON PATH
      ) AS stops
      FROM Routes r
    `);

    const formattedRoutes = result.recordset.map((row) => ({
      ...row,
      stops: JSON.parse(row.stops || "[]"),
    }));

    res.status(200).json(formattedRoutes);
  } catch (error) {
    console.error(error);
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
        // СЕГА ПРАВИЛНО СЕ АЖУРИРА ЦЕНАТА И ПРИ ЕДИТ
        stopReq.input(
          "priceFromStart",
          sql.Decimal(10, 2),
          stop.priceFromStart || 0.0,
        );

        await stopReq.query(`
          INSERT INTO RouteStops (routeId, cityName, stopOrder, arrivalTime, departureTime, platform, priceFromStart)
          VALUES (@routeId, @cityName, @stopOrder, @arrivalTime, @departureTime, @platform, @priceFromStart)
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
  let transaction;
  try {
    const { routeId } = req.params;

    transaction = new sql.Transaction();
    await transaction.begin();

    const deletePaymentsReq = new sql.Request(transaction);
    deletePaymentsReq.input("routeId", sql.Int, routeId);
    await deletePaymentsReq.query(`
      DELETE FROM Payments 
      WHERE reservationId IN (
        SELECT res.id FROM Reservations res
        INNER JOIN Trips t ON res.tripId = t.id
        WHERE t.routeId = @routeId
      )
    `);
    const deleteResSeatsReq = new sql.Request(transaction);
    deleteResSeatsReq.input("routeId", sql.Int, routeId);
    await deleteResSeatsReq.query(`
      DELETE FROM ReservationSeats 
      WHERE reservationId IN (
        SELECT res.id FROM Reservations res
        INNER JOIN Trips t ON res.tripId = t.id
        WHERE t.routeId = @routeId
      )
    `);
    const deleteReservationsReq = new sql.Request(transaction);
    deleteReservationsReq.input("routeId", sql.Int, routeId);
    await deleteReservationsReq.query(`
      DELETE FROM Reservations 
      WHERE tripId IN (SELECT id FROM Trips WHERE routeId = @routeId)
    `);
  const deleteTripsReq = new sql.Request(transaction);
    deleteTripsReq.input("routeId", sql.Int, routeId);
    await deleteTripsReq.query(`
      DELETE FROM Trips WHERE routeId = @routeId
    `);

    const deleteStopsReq = new sql.Request(transaction);
    deleteStopsReq.input("routeId", sql.Int, routeId);
    await deleteStopsReq.query(`
      DELETE FROM RouteStops WHERE routeId = @routeId
    `);

    const deleteRouteReq = new sql.Request(transaction);
    deleteRouteReq.input("routeId", sql.Int, routeId);
    await deleteRouteReq.query(`
      DELETE FROM Routes WHERE id = @routeId
    `);

    await transaction.commit();
    return res
      .status(200)
      .json({
        message:
          "Route and all associated trips/reservations successfully deleted",
      });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};