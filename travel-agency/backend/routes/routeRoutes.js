const express = require("express");

const router = express.Router();

const { getAllRoutes, getRouteByID, deleteRoute, createRoute, updateRoute } = require("../handlers/routesHandler");


router.get("routes/all-routes", getAllRoutes);

router.get("/routes/:id", getRouteByID);

router.post("/routes/create", createRoute)

router.delete("/routes/delete/:id", deleteRoute)

router.patch("routes/update/:id", updateRoute)

module.exports = router;
