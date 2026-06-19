const sql = require("../db");

const ifBussAvilable = (
  availableIntent,
  availableFrom,
  registrationExpiryDate,
) => {
  const today = new Date();
  if (registrationExpiryDate && new Date(registrationExpiryDate) <= today) {
    return "No";
  }
  if (availableFrom && new Date(availableFrom) > today) {
    return "No";
  }
  if (availableIntent === "Yes" || Number(availableIntent) === 1) {
    return "Yes";
  }
  return "No";
};

exports.addBuss = async (req, res) => {
  let transaction;
  try {
    const {
      busNumber,
      plateNumber,
      totalSeats,
      registrationExpiryDate,
      available,
      availableFrom,
    } = req.body;

    if (!busNumber || !plateNumber || !registrationExpiryDate || !totalSeats) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const checkBussRequest = new sql.Request();
    checkBussRequest.input("busNumber", sql.NVarChar, busNumber);
    checkBussRequest.input("plateNumber", sql.NVarChar, plateNumber);
    const checkBuss = await checkBussRequest.query(
      `SELECT busNumber, plateNumber FROM Buses
       WHERE busNumber=@busNumber OR plateNumber=@plateNumber`,
    );

    if (checkBuss.recordset[0]) {
      return res.status(400).json({
        error: "Bus with this number or plate already exists",
      });
    }

    transaction = new sql.Transaction();
    await transaction.begin();

    const finalAvaiable = ifBussAvilable(
      available,
      availableFrom,
      registrationExpiryDate,
    );

    const addBusRequest = new sql.Request(transaction);
    addBusRequest.input("busNumber", sql.NVarChar, busNumber);
    addBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
    addBusRequest.input("totalSeats", sql.Int, totalSeats);
    addBusRequest.input(
      "registrationExpiryDate",
      sql.DateTime,
      new Date(registrationExpiryDate),
    );
    addBusRequest.input(
      "availableFrom",
      availableFrom && availableFrom.trim() !== ""
        ? new Date(availableFrom)
        : null,
    );
    addBusRequest.input("available", sql.NVarChar, finalAvaiable);

    const busResult = await addBusRequest.query(`
      INSERT INTO Buses (busNumber, plateNumber, totalSeats, registrationExpiryDate, available, availableFrom)
      OUTPUT INSERTED.id
      VALUES (@busNumber, @plateNumber, @totalSeats, @registrationExpiryDate, @available, @availableFrom)
    `);

    const busId = busResult.recordset[0].id;
    const totalSeatsNum = Number(totalSeats);

    for (let i = 1; i <= totalSeatsNum; i++) {
      const seatRequest = new sql.Request(transaction);
      seatRequest.input("busId", sql.Int, busId);
      seatRequest.input("seatNumber", sql.NVarChar, i.toString());
      const isWindow = i % 4 === 1 || i % 4 === 0 ? 1 : 0;
      seatRequest.input("isWindowSeat", sql.Bit, isWindow);
      await seatRequest.query(`
        INSERT INTO BusSeats (busId, seatNumber, isWindowSeat, hasExtraLegroom, hasUsbCharging)
        VALUES (@busId, @seatNumber, @isWindowSeat, 0, 0)
      `);
    }

    await transaction.commit();
    res.status(201).json({ message: "Bus and seats added successfully." });
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error adding bus:", error.message);
    res.status(500).json({ error: "An error occurred while adding the bus." });
  }
};

exports.updateBuss = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      busNumber,
      plateNumber,
      registrationExpiryDate,
      available,
      availableFrom,
    } = req.body;

    const finalAvaiable = ifBussAvilable(
      available,
      availableFrom,
      registrationExpiryDate,
    );

    const updateBusRequest = new sql.Request();
    updateBusRequest.input("id", sql.Int, id);
    updateBusRequest.input("busNumber", sql.NVarChar, busNumber);
    updateBusRequest.input("plateNumber", sql.NVarChar, plateNumber);
    updateBusRequest.input("available", sql.NVarChar, finalAvaiable);

    updateBusRequest.input(
      "registrationExpiryDate",
      sql.Date,
      registrationExpiryDate && registrationExpiryDate.toString().trim() !== ""
        ? new Date(registrationExpiryDate)
        : null,
    );

    updateBusRequest.input(
      "availableFrom",
      sql.Date,
      availableFrom && availableFrom.toString().trim() !== ""
        ? new Date(availableFrom)
        : null,
    );

    await updateBusRequest.query(`
      UPDATE Buses
      SET
        busNumber = @busNumber,
        plateNumber = @plateNumber,
        registrationExpiryDate = @registrationExpiryDate,
        available = @available,
        availableFrom = @availableFrom
      WHERE id = @id
    `);

    res.status(200).json({ message: "Bus updated successfully." });
  } catch (error) {
    console.error("Error updating bus:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the bus." });
  }
};

exports.getAllBusses = async (req, res) => {
  try {
    const getBussesRequest = new sql.Request();
    const today = new Date();
    getBussesRequest.input("now", sql.DateTime, today);

    const buses = await getBussesRequest.query(`
      SELECT b.*, 
             (SELECT COUNT(*) FROM Trips t 
              WHERE t.busId = b.id 
                AND @now >= t.departureDateTime 
                AND @now <= t.arrivalDateTime) AS isCurrentlyOnTrip
      FROM Buses b
    `);

    const updatedBuses = buses.recordset.map((bus) => {
      let currentAvailability = ifBussAvilable(
        bus.available,
        bus.availableFrom,
        bus.registrationExpiryDate,
      );
      if (bus.isCurrentlyOnTrip > 0) {
        currentAvailability = "No";
      }
      return {
        ...bus,
        available: currentAvailability,
      };
    });

    res.status(200).json({
      message: "Buses retrieved successfully.",
      buses: updatedBuses,
    });
  } catch (error) {
    console.error("Error retrieving buses:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving buses." });
  }
};

exports.deleteBuss = async (req, res) => {
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
      bus: deletedBus.recordset[0],
    });
  } catch (error) {
    console.error("Error deleting bus:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the bus." });
  }
};

exports.updateSeatConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const { isWindowSeat, hasExtraLegroom, hasUsbCharging } = req.body;

    const updateSeatRequest = new sql.Request();
    updateSeatRequest.input("id", sql.Int, id);
    updateSeatRequest.input("isWindowSeat", sql.Bit, isWindowSeat);
    updateSeatRequest.input("hasExtraLegroom", sql.Bit, hasExtraLegroom);
    updateSeatRequest.input("hasUsbCharging", sql.Bit, hasUsbCharging);

    await updateSeatRequest.query(`
      UPDATE BusSeats
      SET isWindowSeat = @isWindowSeat,
          hasExtraLegroom = @hasExtraLegroom,
          hasUsbCharging = @hasUsbCharging
      WHERE id = @id
    `);

    res
      .status(200)
      .json({ message: "Seat configuration updated successfully." });
  } catch (error) {
    console.error("Error updating seat configuration:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the seat." });
  }
};

exports.getBussSeats = async (req, res) => {
  try {
    const { busId } = req.params;
    const getSeatsRequest = new sql.Request();
    getSeatsRequest.input("busId", sql.Int, busId);

    const seats = await getSeatsRequest.query(`
      SELECT * FROM BusSeats 
      WHERE busId = @busId 
      ORDER BY CAST(seatNumber AS INT) ASC
    `);

    res.status(200).json({
      message: "Seats retrieved successfully.",
      seats: seats.recordset,
    });
  } catch (error) {
    console.error("Error retrieving seats:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving seats." });
  }
};
