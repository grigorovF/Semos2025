const express = require("express");
const router = express.Router();

const routeController = require("../routesLogic/routesLogic");
const { protect, restrictTo } = require("../../middelwares/auth");

router.post(
  "/add-route",
  protect,
  restrictTo("admin"),
  routeController.addRoute,
);

router.get("/", routeController.getAllRoutesPublic);

router.get("/all", protect, restrictTo("admin"), routeController.getAllRoutes);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  routeController.deleteRoute,
);
module.exports = router;
