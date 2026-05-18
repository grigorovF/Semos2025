const { route } = require("../routes/userRoutes");
const sql = require("./../db");

exports.createRoute = async (req, res) => {
  try {
    const { startCity, endCity, stops } = req.body;

    if (!startCity || !endCity || !stops || stops.length < 2) {
      return res.status(400).json({
        message: "Invalid credentials. Please enter correct fields",
      });
    }

    for (const stop of stops) {
      if (!stop.cityName || stop.stopOrder == null) {
        return res.status(400).json({
          message: "Each stop must have cityName and stopOrder",
        });
      }
    }

    const routeName = req.body.routeName || `${startCity} - ${endCity}`;

    const checkRoute = new sql.Request();

    checkRoute.input("name", sql.NVarChar, routeName);

    const existingRoute = await checkRoute.query(`
      SELECT id
      FROM Routes
      WHERE routeName = @name
    `);

    if (existingRoute.recordset.length > 0) {
      return res.status(400).json({
        message: "This route already exists!",
      });
    }

    const routeRequest = new sql.Request();

    routeRequest.input("routeName", sql.NVarChar, routeName);
    routeRequest.input("startCity", sql.NVarChar, startCity);
    routeRequest.input("endCity", sql.NVarChar, endCity);

    const insertRoute = await routeRequest.query(`
      INSERT INTO Routes(routeName, startCity, endCity)
      OUTPUT INSERTED.*
      VALUES(@routeName, @startCity, @endCity)
    `);

    const routeId = insertRoute.recordset[0].id;

    for (const stop of stops) {
      const stopRequest = new sql.Request();

      stopRequest.input("routeId", sql.Int, routeId);
      stopRequest.input("cityName", sql.NVarChar, stop.cityName);
      stopRequest.input("stopOrder", sql.Int, stop.stopOrder);
      stopRequest.input("arr", sql.Time, stop.arrivalTime || null);

      stopRequest.input("dep", sql.Time, stop.departureTime || null);

      await stopRequest.query(`
        INSERT INTO RouteStops(
          routeId,
          cityName,
          stopOrder,
          arrivalTime,
          departureTime
        )
        VALUES(
          @routeId,
          @cityName,
          @stopOrder,
          @arr,
          @dep
        )
      `);
    }

    res.status(201).json({
      message: "Route successfully added!",
      route: insertRoute.recordset[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message + "Failed creating route",
    });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const reqest = new sql.Request();

    const getRotes = await reqest.query(`SELECT * FROM Routes`);
    res.status(200).json(getRotes.recordset);
  } catch (err) {
    res.status(500).json({
      error: err.message + "Failed fetching routes",
    });
  }
};

exports.getRouteByID = async (req, res) => {
  try {
    const { id } = req.params;

    const request = new sql.Request();
    request.input("id", sql.Int, id);
    const route = await request.query(`
        SELECT * FROM Routes WHERE id = @id
        `);

    if (route.recordset.length === 0) {
      return res.status(404).json({
        message: "Route not found",
      });
    }
    const stopRequest = new sql.Request();
    stopRequest.input("id", sql.Int, id);
    const stops = await stopRequest.query(
      `SELECT * FROM routeStops WHERE routeId = @id`,
    );

    res.status(200).json({
      route: route.recordset[0],
      stops: stops.recordset,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message + "Failed finding route",
    });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteStops = new sql.Request();
    deleteStops.input("id", sql.Int, id);
    await deleteStops.query(`
            DELETE FROM RouteStops
            WHERE routeId = @id
            `);

    const deleteRouteRequest = new sql.Request();
    deleteRouteRequest.input("id", sql.Int, id);
    const deletedRoute = await deleteRouteRequest.query(`
            DELETE FROM Routes
            OUTPUT DELETED.*
            WHERE id = @id
            `);

    res.status(200).json({
      message: "Route deleted successfully",
      route: deletedRoute.recordset[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message + "Failed deleting route",
    });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { routeName, startCity, endCity, stops } = req.body;

    const updateRequest = new sql.Request();

    updateRequest.input("id", sql.Int, id);
    updateRequest.input("routeName", sql.NVarChar, routeName);
    updateRequest.input("startCity", sql.NVarChar, startCity);
    updateRequest.input("endCity", sql.NVarChar, endCity);

    const updatedRoute = await updateRequest.query(`
        UPDATE Routes
        SET
          routeName = @routeName,
          startCity = @startCity,
          endCity = @endCity
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (updatedRoute.recordset.length === 0) {
      return res.status(404).json({
        message: "Route not found",
      });
    }

    const deleteStopsRequest = new sql.Request();

    deleteStopsRequest.input("id", sql.Int, id);

    await deleteStopsRequest.query(`
        DELETE FROM RouteStops
        WHERE routeId = @id
      `);

    if (stops && stops.length > 0) {
      for (const stop of stops) {
        const stopRequest = new sql.Request();

        stopRequest.input("routeId", sql.Int, id);
        stopRequest.input("cityName", sql.NVarChar, stop.cityName);

        stopRequest.input("stopOrder", sql.Int, stop.stopOrder);

        stopRequest.input("arr", sql.Time, stop.arrivalTime || null);

        stopRequest.input("dep", sql.Time, stop.departureTime || null);

        await stopRequest.query(`
            INSERT INTO RouteStops(
              routeId,
              cityName,
              stopOrder,
              arrivalTime,
              departureTime
            )
            VALUES(
              @routeId,
              @cityName,
              @stopOrder,
              @arr,
              @dep
            )
          `);
      }
    }

    res.status(200).json({
      message: "Route updated successfully!",
      route: updatedRoute.recordset[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed updating route",
    });
  }
};