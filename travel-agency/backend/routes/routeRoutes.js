const express = require("express");

const router = express.Router();

const {
  createRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
  scheduleTrip,
  getAvailableBusesForPeriod,
} = require("../handlers/routesHandler");


router.post("/add-route", createRoute);
router.get("/all-routes", getAllRoutes);
router.patch("/update-route/:id", updateRoute);
router.delete("/delete-route/:id", deleteRoute);
router.get("/available-buss", getAvailableBusesForPeriod)
router.post("/schedule-trip/:id", scheduleTrip)
module.exports = router;
