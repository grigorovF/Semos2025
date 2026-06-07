const sql = require("../db");

exports.addBuss = async (req, res) => {
  try {
    const {
      busNumber,
      plateNumber,
      totalSeats,
      registrationExpiryDate,
      available,
      availableFrom,
    } = req.body;

    if (!busNumber || !plateNumber || !totalSeats || !registrationExpiryDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const checkBusRequest = new sql.Request();
    checkBusRequest.input("busNumber", sql.NVarChar, busNumber);
    checkBusRequest.input("plateNumber", sql.NVarChar, plateNumber);

    const checkBus = await checkBusRequest.query(`
            SELECT busNumber, plateNumber FROM Buses
            WHERE busNumber = @busNumber OR plateNumber = @plateNumber
        `);

    if (checkBus.recordset[0]) {
      return res
        .status(400)
        .json({ error: "Bus with the same number or plate already exists." });
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
    addBusRequest.input("availableFrom", sql.Date, new Date(availableFrom));
    const availableValue = Number(available) === 1 ? "Yes" : "No"
    addBusRequest.input("available", sql.NVarChar, availableValue);

    await addBusRequest.query(`
            INSERT INTO Buses (busNumber, plateNumber, totalSeats, registrationExpiryDate, available, availableFrom)
            VALUES (@busNumber, @plateNumber, @totalSeats, @registrationExpiryDate, @available, @availableFrom)
        `);

    res.status(201).json({ message: "Bus added successfully." });
  } catch (error) {
    console.error("Error adding bus:", error.message);
    res.status(500).json({ error: "An error occurred while adding the bus." });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      busNumber,
      plateNumber,
      totalSeats,
      registrationExpiryDate,
      available,
      availableFrom,
    } = req.body;

    const updateBusRequest = new sql.Request();

    updateBusRequest.input("id", sql.Int, id);
    updateBusRequest.input("busNumber", sql.NVarChar, busNumber);
    updateBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
    updateBusRequest.input("totalSeats", sql.Int, totalSeats);

    updateBusRequest.input(
      "registrationExpiryDate",
      sql.Date,
      registrationExpiryDate ? new Date(registrationExpiryDate) : null,
    );

    updateBusRequest.input("available", sql.NVarChar, available);

    updateBusRequest.input(
      "availableFrom",
      sql.Date,
      availableFrom ? new Date(availableFrom) : null,
    );

    await updateBusRequest.query(`
      UPDATE Buses
      SET
        busNumber = @busNumber,
        plateNumber = @plateNumber,
        totalSeats = @totalSeats,
        registrationExpiryDate = @registrationExpiryDate,
        available = @available,
        availableFrom = @availableFrom
      WHERE id = @id
    `);

    res.status(200).json({
      message: "Bus updated successfully.",
    });
  } catch (error) {
    console.error("Error updating bus:", error);

    res.status(500).json({
      error: "An error occurred while updating the bus.",
    });
  }
};

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

exports.getAllBusses = async (req, res) => {
  try {
    const getBussesRequest = new sql.Request();

    const buses = await getBussesRequest.query(`
      SELECT * FROM Buses
    `);

    const today = new Date();

    const updatedBuses = buses.recordset.map((bus) => {
      const availableFrom = bus.availableFrom
        ? new Date(bus.availableFrom)
        : null;

      return {
        ...bus,
        available:
          availableFrom && availableFrom <= today ? "Yes" : bus.available,
      };
    });

    res.status(200).json({
      message: "Buses retrieved successfully.",
      buses: updatedBuses,
    });
  } catch (error) {
    console.error("Error retrieving buses:", error.message);

    res.status(500).json({
      error: "An error occurred while retrieving buses.",
    });
  }
};