const express = require("express");
const router = express.Router();

const routeController = require("../routesLogic/routesLogic");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/add-route",
  protect,
  restrictTo("admin"),
  routeController.addRoute,
);

module.exports = router;
