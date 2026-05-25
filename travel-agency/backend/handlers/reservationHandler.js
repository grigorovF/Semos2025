const sql = require("../db");
const sendMail = require("./emailHandler");

// 1. КРЕИРАЊЕ РЕЗЕРВАЦИЈА (КУПУВАЊЕ ПРАЗНИ СЕДИШТА)
exports.reserveTrip = async (req, res) => {
  try {
    const {
      tripId,
      fromStopId,
      toStopId,
      seatsBooked, // Број на седишта кои се купуваат одеднаш (на пр. 10)
      guestEmail,
      guestPhone,
      hasExtraLegroom,
      hasWindowSeat,
      hasExtraLuggage,
      hasOnboardMonitor,
      hasUSBCharging,
      discountCode,
    } = req.body;

    // Валидација за задолжителни полиња
    if (
      !tripId ||
      !fromStopId ||
      !toStopId ||
      !seatsBooked ||
      seatsBooked <= 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid reservation data provided." });
    }

    // Проверка дали корисникот е логиран преку токен
    const userId = req.user ? req.user.id : null;
    const emailToDeliver = req.user ? req.user.email : guestEmail;

    // Ако е гост, е-мејл и телефон за контакт мора да постојат
    if (!userId && (!guestEmail || !guestPhone)) {
      return res
        .status(400)
        .json({
          message:
            "Guest email and phone number are required for non-registered users.",
        });
    }

    const request = new sql.Request();
    request.input("tripId", sql.Int, tripId);

    // Земање на цената на патувањето и името на рутата
    const tripResult = await request.query(`
      SELECT t.price, r.routeName FROM Trips t JOIN Routes r ON t.routeId = r.id WHERE t.id = @tripId
    `);

    if (tripResult.recordset.length === 0) {
      return res.status(404).json({ message: "Trip not found." });
    }

    const { price, routeName } = tripResult.recordset[0];

    // Проверка за слободни места во автобусот (Вкупен капацитет минус активни резервации)
    const seatsCheck = await request.query(`
      SELECT b.totalSeats - ISNULL((SELECT SUM(seatsBooked) FROM Reservations WHERE tripId = @tripId AND reservationStatus != 'cancelled'), 0) AS avSeats
      FROM Trips t JOIN Buses b ON t.busId = b.id WHERE t.id = @tripId
    `);

    if (seatsCheck.recordset[0].avSeats < seatsBooked) {
      return res.status(400).json({
        message: `Not enough available seats. Only ${seatsCheck.recordset[0].avSeats} seats left.`,
      });
    }

    // Проверка за лојалност (Ако логиран корисник има повеќе од 3 потврдени патувања)
    let hasLoyaltyBenefits = false;
    if (userId) {
      const loyaltyResult = await request.query(`
        SELECT COUNT(*) AS pastTrips FROM Reservations WHERE userId = ${userId} AND reservationStatus = 'confirmed'
      `);
      if (loyaltyResult.recordset[0].pastTrips > 3) hasLoyaltyBenefits = true;
    }

    // Пресметка на додатоци (Ако е лојален патник, додатоците му се бесплатни)
    let addonsPrice = 0;
    if (!hasLoyaltyBenefits) {
      if (hasExtraLegroom) addonsPrice += 5;
      if (hasWindowSeat) addonsPrice += 5;
      if (hasExtraLuggage) addonsPrice += 10;
    }

    // Финална пресметка на сумата
    let totalPrice = Number(price) * seatsBooked + addonsPrice;
    if (hasLoyaltyBenefits) totalPrice *= 0.85; // 15% попуст за лојалност
    if (discountCode && discountCode === "PROMO20" && !hasLoyaltyBenefits)
      totalPrice *= 0.8; // 20% промо код

    // Вметнување на главната резервација во базата
    const insertRequest = new sql.Request();
    insertRequest.input("userId", sql.Int, userId);
    insertRequest.input("tripId", sql.Int, tripId);
    insertRequest.input("fromStopId", sql.Int, fromStopId);
    insertRequest.input("toStopId", sql.Int, toStopId);
    insertRequest.input("seatsBooked", sql.Int, seatsBooked);
    insertRequest.input("totalPrice", sql.Decimal(10, 2), totalPrice);
    insertRequest.input("guestEmail", sql.NVarChar, userId ? null : guestEmail);
    insertRequest.input("guestPhone", sql.NVarChar, userId ? null : guestPhone);
    insertRequest.input("discountCode", sql.NVarChar, discountCode || null);

    const insertResult = await insertRequest.query(`
      INSERT INTO Reservations (userId, tripId, fromStopId, toStopId, seatsBooked, totalPrice, reservationStatus, guestEmail, guestPhone, discountCode)
      OUTPUT INSERTED.* VALUES (@userId, @tripId, @fromStopId, @toStopId, @seatsBooked, @totalPrice, 'pending', @guestEmail, @guestPhone, @discountCode)
    `);

    const reservation = insertResult.recordset[0];

    // Креирање на поединечни празни седишта во ReservationSeats (Ќе се пополнат на Check-in)
    for (let i = 1; i <= seatsBooked; i++) {
      await request.query(
        `INSERT INTO ReservationSeats (reservationId, seatNumber) VALUES (${reservation.id}, ${i})`,
      );
    }

    // Испраќање на е-мејл известување за купената групна карта
    await sendMail({
      email: emailToDeliver,
      subject: "Seats Reservation Confirmation",
      message: `You have successfully reserved ${seatsBooked} seats for ${routeName}. Total price: ${totalPrice} EUR. Please complete the passenger check-in within 48 hours before departure using Reservation Code: ${reservation.id}.`,
    });

    res.status(201).json({
      message: "Reservation successfully created. Seats are on hold.",
      reservationId: reservation.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. ПРЕГЛЕД НА СОПСТВЕНИ РЕЗЕРВАЦИИ (Само за логирани корисници)
exports.getMyReservations = async (req, res) => {
  try {
    const request = new sql.Request();
    request.input("userId", sql.Int, req.user.id);

    const result = await request.query(`
      SELECT res.*, r.routeName, t.departureDate 
      FROM Reservations res
      JOIN Trips t ON res.tripId = t.id
      JOIN Routes r ON t.routeId = r.id
      WHERE res.userId = @userId
      ORDER BY res.createdAt DESC
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. БРИШЕЊЕ / ОТКАЖУВАЊЕ НА КОМПЛЕТНАТА РЕЗЕРВАЦИЈА
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params; // ИД на главната резервација
    const request = new sql.Request();
    request.input("id", sql.Int, id);

    let query = "";

    // Ако корисникот е логиран, смее да ја избрише само СВОЈАТА резервација
    if (req.user) {
      request.input("userId", sql.Int, req.user.id);
      query = `DELETE FROM Reservations OUTPUT DELETED.* WHERE id = @id AND userId = @userId`;
    } else {
      // За гости, се брише директно преку ИД-то (од линкот за откажување)
      query = `DELETE FROM Reservations OUTPUT DELETED.* WHERE id = @id`;
    }

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "Reservation not found or unauthorized to delete." });
    }

    // Забелешка: Поради ON DELETE CASCADE во базата, редовите во ReservationSeats
    // автоматски се чистат сами, со што седиштата во автобусот се ослободуваат.

    res.status(200).json({
      message: "Reservation successfully deleted and seats are released.",
      deletedReservation: result.recordset[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
