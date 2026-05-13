const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  passwordReset,
} = require("../handlers/userHandlers");

const { getAllRoutes, getAllTrips } = require("../handlers/publicHandler");

const {
  reserveTrip,
  getMyReservations,
  getAvailableSeats,
} = require("../handlers/reservationsHandler");

const { addInstallment } = require("../handlers/paymentsHandler");

const { protect } = require("../middlewares");

router.use(protect);

router.get("/routes", getAllRoutes);
router.get("/trips", getAllTrips);

router.post("/reservations", reserveTrip);
router.get("/reservations/me", getMyReservations);

router.get("/available-seats", getAvailableSeats);

router.post("/payments/installment", addInstallment);

module.exports = router;
