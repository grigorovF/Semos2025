const express = require("express");

const router = express.Router();

const {
  getAllTrips,
  scheduleTrip,
  getAvaiableBusses,
} = require("../handlers/tripHandler");

router.get("/all-trips", getAllTrips);



module.exports = router;
