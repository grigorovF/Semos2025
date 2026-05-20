const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  passwordReset,
} = require("../handlers/userHandler");

const { getAllTrips, getTripById } = require("../handlers/tripHandler");

const {
  getRouteByID,
  getAllRoutes,
  createRoute,
  deleteRoute,
  updateRoute,
} = require("../handlers/routesHandler");

const {
  reserveTrip,
  getMyReservations,
  getAvaiableSeats,
  cancelReservation,
} = require("../handlers/reservationHandler");

const {
  confirmInstallment,
  createPaymentIntent,
} = require("../handlers/paymentHandler");

const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", passwordReset);

router.post("/create-route", createRoute);
router.get("/routes/:id", getRouteByID);
router.get("/all-trips", getAllTrips);
router.get("/trips/:id", getTripById);
//router.get("/avaiable-seats", getAvaiableSeats);
router.post("/payments/installment", createPaymentIntent);
router.post("/payments/comfirm-installment", confirmInstallment);
//router.patch("/reservations/cancel/:id", cancelReservation);

//router.post("/reservations", reserveTrip);

// router.use(protect);
// router.get("reservations/my-reservations", getMyReservations);
// router.patch("/payments/:paymentId/confirm", confirmPayment);

module.exports = router;
