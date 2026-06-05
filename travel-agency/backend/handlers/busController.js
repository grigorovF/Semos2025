const sql = require("../db");

exports.addBuss = async(req, res) => {
    try{
        const { busNumber, plateNumber, totalSeats, registrationExpiryDate } = req.body;

    if (!busNumber || !plateNumber || !totalSeats || !registrationExpiryDate) {
        return res.status(400).json({
             error: "All fields are required." 
        });
    }

    const checkBusRequest = new sql.Request();
    checkBusRequest.input("busNumber", sql.NVarChar, busNumber);
    checkBusRequest.input("plateNumber", sql.NVarChar, plateNumber);

    const checkBus = await checkBusRequest.query(`
        SELECT busNumber, plateNumber
        FROM Buses
        WHERE busNumber = @busNumber OR plateNumber = @plateNumber
    `);

    const checkBusResult = checkBus.recordset[0];

    if (checkBusResult) {
        return res.status(400).json({
            error: "Bus with the same number or plate already exists."
        });
    }

    const addBusRequest = new sql.Request();
    addBusRequest.input("busNumber", sql.NVarChar, busNumber);
    addBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
    addBusRequest.input("totalSeats", sql.Int, totalSeats);
    addBusRequest.input(
      "registrationExpiryDate",
      sql.Date,
      new Date(registrationExpiryDate),
    );
    addBusRequest.input("Available", sql.Bit, 1);

    const addBus = await addBusRequest.query(`
        INSERT INTO Buses (busNumber, plateNumber, totalSeats, registrationExpiryDate, Available)
        VALUES (@busNumber, @plateNumber, @totalSeats, @registrationExpiryDate, @Available)
    `);

    res.status(201).json({
        message: "Bus added successfully."
    });
    }
    catch(error){
        console.error("Error adding bus:", error);
        res.status(500).json({
            error: "An error occurred while adding the bus."
        });
    }
}

exports.getAllBuses = async (req, res) => {
    try {
        const getBusesRequest = new sql.Request();
        const buses = await getBusesRequest.query(`
            SELECT id, busNumber, plateNumber, totalSeats, registrationExpiryDate
            FROM Buses
        `);
        res.status(200).json({
            buses: buses.recordset
        });
    } catch (error) {
        //console.error("Error fetching buses:", error);
        res.status(500).json({
            error: "An error occurred while fetching the buses."
        });
    }   
}

exports.updateBus = async (req, res) => {
    try {
        const { plateNumber } = req.params;
        if (!plateNumber) {
            return res.status(400).json({
                error: "Bus plate number is required."
            });
        }   

        const updateBusRequest = new sql.Request();
        updateBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
        updateBusRequest.input("registrationExpiryDate", sql.Date, new Date());

        const updateBus = await updateBusRequest.query(`
            UPDATE Buses
            SET plateNumber = @plateNumber, registrationExpiryDate = @registrationExpiryDate
            WHERE plateNumber = @plateNumber
        `);
        res.status(200).json({
            message: "Bus updated successfully."
        });
    } catch (error) {
        //console.error("Error updating bus:", error);
        res.status(500).json({     
        error: "An error occurred while updating the bus."
        });
    }
}

exports.deleteBus = async (req, res) => {
    try {
        const { plateNumber } = req.params;
        const deleteBusRequest = new sql.Request();
        deleteBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
        const deletedBus = await deleteBusRequest.query(`
            DELETE FROM Buses
            OUTPUT DELETED.*
            WHERE plateNumber = @plateNumber
        `);
        res.status(200).json({
            message: "Bus deleted successfully.",
            bus: deletedBus.recordset[0]
        });
    } catch (error) {
        console.error("Error deleting bus:", error.message);
        res.status(500).json({
            error: "An error occurred while deleting the bus."
        });
    }
}