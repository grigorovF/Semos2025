const sql = require("../db");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE PAYMENT INTENT
exports.createPaymentIntent = async (req, res) => {
  try {
    const { reservationId, amountPaid } = req.body;

    // validation
    if (!reservationId || !amountPaid || amountPaid <= 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // reservation
    const reservationRequest = new sql.Request();

    reservationRequest.input("resId", sql.Int, reservationId);

    const reservationResult = await reservationRequest.query(`
      SELECT totalPrice
      FROM Reservations
      WHERE id = @resId
    `);

    if (reservationResult.recordset.length === 0) {
      return res.status(404).json({
        message: "Reservation doesn't exist",
      });
    }

    const totalPrice = Number(reservationResult.recordset[0].totalPrice);

    // already paid
    const historyRequest = new sql.Request();

    historyRequest.input("resId", sql.Int, reservationId);

    const historyResult = await historyRequest.query(`
      SELECT
        ISNULL(SUM(amountPaid), 0) AS totalPaid
      FROM Payments
      WHERE reservationId = @resId
      AND paymentStatus = 'completed'
    `);

    const totalPaid = Number(historyResult.recordset[0].totalPaid);

    const remainingBalance = totalPrice - totalPaid;

    // overpayment
    if (amountPaid > remainingBalance) {
      return res.status(400).json({
        message: `Remaining balance: ${remainingBalance} €`,
      });
    }

    // STRIPE PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountPaid * 100),
      currency: "eur",
      payment_method_types: ["card"],

      metadata: {
        reservationId: reservationId.toString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// CONFIRM INSTALLMENT PAYMENT
exports.confirmInstallment = async (req, res) => {
  try {
    const { reservationId, paymentIntentId } = req.body;

    if (!reservationId || !paymentIntentId) {
      return res.status(400).json({
        message: "Missing credentials",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    if (
      Number(paymentIntent.metadata.reservationId) !== Number(reservationId)
    ) {
      return res.status(400).json({
        message: "Invalid reservation",
      });
    }

    const duplicateRequest = new sql.Request();

    duplicateRequest.input("transactionId", sql.NVarChar, paymentIntentId);

    const duplicateResult = await duplicateRequest.query(`
      SELECT id
      FROM Payments
      WHERE transactionId = @transactionId
    `);

    if (duplicateResult.recordset.length > 0) {
      return res.status(400).json({
        message: "Payment already confirmed",
      });
    }

    const stripeAmount = paymentIntent.amount / 100;

    const paymentRequest = new sql.Request();
    paymentRequest.input("resId", sql.Int, reservationId);
    paymentRequest.input("amount", sql.Decimal(10, 2), stripeAmount);
    paymentRequest.input(
      "method",
      sql.NVarChar,
      paymentIntent.payment_method_types[0],
    );

    paymentRequest.input("transactionId", sql.NVarChar, paymentIntentId);

    const insertResult = await paymentRequest.query(`
      INSERT INTO Payments
      (
        reservationId,
        amountPaid,
        paymentMethod,
        paymentStatus,
        transactionId
      )

      OUTPUT INSERTED.*

      VALUES
      (
        @resId,
        @amount,
        @method,
        'completed',
        @transactionId
      )
    `);

    res.status(201).json({
      message: "Payment successful",

      payment: insertResult.recordset[0],
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
