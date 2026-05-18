const sql = require("../db");

exports.createTrip = async (req, res) => {
  try {
    const createTripPayload = req.body;
    const { routeId, busId, departureDate, price } = createTripPayload;

    if (!routeId || !busId || !departureDate || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //da najdam ruta
    const findRouteReqest = new sql.Request();
    findRouteReqest.input("routeId", sql.Int, routeId);
    const findRouteQuery = `SELECT * FROM Routes WHERE id = @routeId`;
    const findRouteResult = await findRouteReqest.query(findRouteQuery);

    if (findRouteResult.recordset.length === 0) {
      return res.status(404).json({
        message: "Route not found",
      });
    }
    const existingRoute = findRouteResult.recordset[0];

    //da najdam bus-istata postapka
    const findBusRequest = new sql.Request();
    findBusRequest.input("busId", sql.Int, busId);
    const findBusQuery = `SELECT * FROM Buses WHERE id=@busId`;
    const findBusResult = await findBusRequest.query(findBusQuery);

    if (findBusResult.recordset.length === 0) {
      return res.status(404).json({
        message: "Route not found",
      });
    }
    const existingBus = findBusResult.recordset[0];

    //kreiranje na departure
    const createTripRequest = new sql.Request();
    createTripRequest.input("routeId", sql.Int, routeId);
    createTripRequest.input("busId", sql.Int, busId);
    createTripRequest.input("departureDate", sql.DateTime, departureDate);
    createTripRequest.input("price", sql.Decimal(10, 2), price);

    const createTripQuery = `
        INSERT INTO Trips (routeId, busId, departureDate, price) OUTPUT INSERTED.*
        VALUES (@routeId, @busId, @departureDate, @price)
    `;

    const createTripResult = await createTripRequest.query(createTripQuery);
    const createdTrip = createTripResult.recordset[0];
    res.status(201).json({
      message: "Trip created successfully",
      trip: createdTrip,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed creating trip",
    });
  }
};

exports.getAllTrips = async (req, res) => {
  //SO join za se da dade
  try {
    const getAllTripsRequest = new sql.Request();
    const getAllTripsQuery = `
    SELECT
        t.id,
        t.departureDate,
        t.price,
        t.status,

        r.routeName,
        r.startCity,
        r.endCity,

        b.busNumber,
        b.totalSeats

      FROM Trips t

      JOIN Routes r
      ON t.routeId = r.id

      JOIN Buses b
      ON t.busId = b.id

    `;

    const getAllTripsResult = await getAllTripsRequest.query(getAllTripsQuery);
    const trips = getAllTripsResult.recordset;
    res.status(201).json({
      message: "All trips",
      trips,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message + "Error fatching trips",
    });
  }
};

exports.getTripById = async (req, res) => {
    try{
        const {id} = req.params;
    const getTripRequest = new sql.Request();
    getTripRequest.input("id", sql.Int, id);

    const getTripQuery = `
      SELECT
        t.*,
        r.routeName,
        r.startCity,
        r.endCity,
        b.busNumber,
        b.totalSeats

      FROM Trips t

      JOIN Routes r
      ON t.routeId = r.id

      JOIN Buses b
      ON t.busId = b.id

      WHERE t.id = @id
    `;

    const getTripResult = await getTripRequest.query(getTripQuery);

    if (getTripResult.recordset.length === 0){
        return res.status(404).json({
            message: "Trip not found"
        })
    }

    const existingTrip = getTripResult.recordset[0];
    res.status(200).json({existingTrip});
    }
    catch(err){
        return res.status(500).json({
            message: "Cant find trip with this ID"
        })
    }
}

exports.updateTrip = async (req, res) => {
  try {
    const updateTripParams = req.params;
    const updateTripPayload = req.body;

    const { id } = updateTripParams;

    const { routeId, busId, departureDate, price, status } = updateTripPayload;

    const updateTripRequest = new sql.Request();

    updateTripRequest.input("id", sql.Int, id);

    updateTripRequest.input("routeId", sql.Int, routeId);

    updateTripRequest.input("busId", sql.Int, busId);

    updateTripRequest.input("departureDate", sql.DateTime, departureDate);

    updateTripRequest.input("price", sql.Decimal(10, 2), price);

    updateTripRequest.input("status", sql.NVarChar, status);

    const updateTripQuery = `
        UPDATE Trips
        SET
          routeId = @routeId,
          busId = @busId,
          departureDate = @departureDate,
          price = @price,
          status = @status
  
        OUTPUT INSERTED.*
  
        WHERE id = @id
      `;

    const updateTripResult = await updateTripRequest.query(updateTripQuery);

    if (updateTripResult.recordset.length === 0) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const updatedTrip = updateTripResult.recordset[0];

    res.status(200).json({
      message: "Trip updated successfully",
      trip: updatedTrip,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed updating trip",
    });
  }
};


exports.deleteTrip = async (req, res) => {
  try {
    const deleteTripParams = req.params;

    const { id } = deleteTripParams;

    const deleteTripRequest = new sql.Request();

    deleteTripRequest.input("id", sql.Int, id);

    const deleteTripQuery = `
        DELETE FROM Trips
  
        OUTPUT DELETED.*
  
        WHERE id = @id
      `;

    const deleteTripResult = await deleteTripRequest.query(deleteTripQuery);

    if (deleteTripResult.recordset.length === 0) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const deletedTrip = deleteTripResult.recordset[0];

    res.status(200).json({
      message: "Trip deleted successfully",
      trip: deletedTrip,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed deleting trip",
    });
  }
};
  