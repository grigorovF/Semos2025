const express = require("express");
const router = express.Router();

const reservationController = require("../handlers/reservations/reservations");
const { protect } = require("../middlewares/auth");

router.post("/reserve", protect, reservationController.reserveTrip);

module.exports = router;
