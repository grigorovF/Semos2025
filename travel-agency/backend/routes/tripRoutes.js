const express = require("express");

const router = express.Router();

const {
  getAllTrips,
  scheduleTrip,
  getAvailableBuses,
  getTripsStops
} = require("../handlers/tripsHandler");

router.get("/all-trips", getAllTrips);
router.post("/avaiable-busses", getAvailableBuses);
router.post("/schedule-trip", scheduleTrip);
router.post("/trip-stops/:routeId", getTripsStops);



module.exports = router;
