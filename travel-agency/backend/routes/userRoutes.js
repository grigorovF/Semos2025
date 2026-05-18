const express = require("express");
const router = express.Router();
const { protect } = require("../middelwares/auth");

const {
  register,
  login,
  forgotPassword,
  passwordReset,
} = require("../handlers/userHandler");

const { getAllTrips, getTripById } = require("../handlers/tripHandler");

const { getAllRoutes, getRouteByID } = require("../handlers/routesHandler");

const {
  reserveTrip,
  getMyReservations,
  getAvaiableSeats,
  cancelReservation,
} = require("../handlers/reservationHandler");

const { addInstallment } = require("../handlers/paymentHandler");

const { protect } = require("../middelwares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", passwordReset);
router.get("/all-routes", getAllRoutes);
router.get("/all-trips", getAllTrips);
router.get("trips/:id", getTripById);
router.get("/available-seats", getAvaiableSeats);
router.post("payments/installment", addInstallment);
router.patch("/reservations/cancel/:id", cancelReservation);

router.post("/reservations", reserveTrip);

router.use(protect);
router.get("reservations/my-reservations", getMyReservations);
router.patch("/payments/:paymentId/confirm", confirmPayment);

module.exports = router;
