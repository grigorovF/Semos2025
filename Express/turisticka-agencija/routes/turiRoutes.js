const express = require("express");
const turiController = require("../handlers/turi");
const auth = require("../middleware/auth");

const router = express.Router();

router.get(
  "/reservations",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.getAllReservations,
);

router.get("/", auth.protect, turiController.getAllTours);

router.post(
  "/",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.createTour,
);

router.post(
  "/:id/reserve",
  auth.protect,
  auth.restrictTo("user"),
  turiController.reserveTour,
);

router.get("/:id", auth.protect, turiController.getOneTour);

router.patch(
  "/:id",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.updateTour,
);

router.delete(
  "/:id",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.deleteTour,
);

module.exports = router;
