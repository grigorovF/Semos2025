const express = require("express");
const router = express.Router();

const reservationController = require("../reservations/reservations");
const { protect, restrictTo } = require("../../middelwares/auth");

router.post("/reserve", protect, reservationController.reserveTrip);

router.get("/my", protect, reservationController.getMyReservations);

router.get(
  "/all",
  protect,
  restrictTo("admin"),
  reservationController.getAllReservations,
);

router.get("/popular", reservationController.getPopularRoutes);

router.delete("/cancel/:id", protect, reservationController.cancelReservation);

router.patch("/pay/:id", protect, reservationController.payReservation);

module.exports = router;
