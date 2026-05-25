const sql = require("../db");

// 1. ЗЕМИ ГИ СЕДИШТАТА ЗА CHECK-IN (Прикажи ја формата во React)
exports.getCheckInDetails = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const request = new sql.Request();
    request.input("resId", sql.Int, reservationId);

    // Проверуваме кога е патувањето
    const result = await request.query(`
      SELECT r.id, t.departureDate, r.reservationStatus
      FROM Reservations r
      JOIN Trips t ON r.tripId = t.id
      WHERE r.id = @resId
    `);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "Reservation doesn't exist" });
    }

    const { departureDate } = result.recordset[0];
    const travelDate = new Date(departureDate);
    const now = new Date();

    // Пресметка на преостанати часови до поаѓање
    const hoursLeft = (travelDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursLeft > 48) {
      return res.status(400).json({
        message: `Check-in opens 48h before departure. Time left: ${Math.floor(hoursLeft - 48)} hours.`,
      });
    }

    if (hoursLeft < 2) {
      return res
        .status(400)
        .json({ message: "Check-in closed." });
    }

    // Ако сè е во ред, ги враќаме седиштата за React да изгенерира форми за сите патници
    const seats = await request.query(
      `SELECT * FROM ReservationSeats WHERE reservationId = @resId`,
    );

    res.status(200).json({
      departureDate,
      seats: seats.recordset,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. ИЗВРШИ CHECK-IN ЗА СЕДИШТЕ (Со валидација за пасош од 90 дена)
exports.submitCheckIn = async (req, res) => {
  try {
    const { seatId, firstName, lastName, passportNumber, expiredDate } =
      req.body;

    if (!seatId || !firstName || !lastName || !passportNumber || !expiredDate) {
      return res
        .status(400)
        .json({ message: "All fields  are required" });
    }

    const request = new sql.Request();
    request.input("seatId", sql.Int, seatId);

    // Земање на датумот на патување преку seatId
    const tripInfo = await request.query(`
      SELECT t.departureDate 
      FROM ReservationSeats rs
      JOIN Reservations r ON rs.reservationId = r.id
      JOIN Trips t ON r.tripId = t.id
      WHERE rs.id = @seatId
    `);

    if (tripInfo.recordset.length === 0) {
      return res.status(404).json({ message: "Seat doesn't exist" });
    }

    const travelDate = new Date(tripInfo.recordset[0].departureDate);
    const passportExp = new Date(expiredDate);

    // Проверка за 90 дена
    const timeDiff = passportExp.getTime() - travelDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 90) {
      return res.status(400).json({
        message: `Error with ${firstName} ${lastName}! Passport expires in less than 90 days.`,
      });
    }

    // Зачувување на податоците и означување како checked-in
    request.input("fName", sql.NVarChar, firstName);
    request.input("lName", sql.NVarChar, lastName);
    request.input("pNum", sql.NVarChar, passportNumber);
    request.input("expDate", sql.Date, expiredDate);

    await request.query(`
      UPDATE ReservationSeats
      SET passengerFirstName = @fName,
          passengerLastName = @lName,
          passportNumber = @pNum,
          passportExpiredDate = @expDate,
          isCheckedIn = 1
      WHERE id = @seatId
    `);

    res
      .status(200)
      .json({
        message: `Check-in ${firstName} ${lastName}!`,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
