const express = require("express");

const router = express.Router();

const { getAllTrips, getTripById, deleteTrip, updateTrip } = require("../handlers/tripHandler");

router.get("/all-trips", getAllTrips);

router.get("/trips/:id", getTripById);

router.delete("/trips/delete/:id", deleteTrip);

router.patch("/trip/update/:id", updateTrip);

module.exports = router;
