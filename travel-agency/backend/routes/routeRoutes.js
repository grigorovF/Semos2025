const express = require("express");

const router = express.Router();

const {
  createRoute,
  getAllRoutes,
  updateRoute,
  deleteRoute,
} = require("../handlers/routesHandler");


router.post("/add-route", createRoute);
router.get("/all-routes", getAllRoutes);
router.patch("/update-route/:id", updateRoute);
router.delete("/delete-route/:routeId", deleteRoute);
module.exports = router;
