const express = require("express");
const router = express.Router();

const {
  createRoute,
  getAllRoutes,
  deleteRoute,
} = require("../handlers/routesHandler");

const {
  createTrip,
  getAllTrips,
  deleteTrip,
} = require("../handlers/tripsHandler");

const { protect } = require("../middlewares");

const { isAdmin } = require("../middlewares/isAdmin");

// ALL ADMIN ROUTES PROTECTED
router.use(protect);
router.use(isAdmin);

router.post("/routes", createRoute);
router.get("/routes", getAllRoutes);
router.delete("/routes/:id", deleteRoute);

router.post("/trips", createTrip);
router.get("/trips", getAllTrips);
router.delete("/trips/:id", deleteTrip);

module.exports = router;
