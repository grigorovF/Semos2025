const express = require("express");
const turiController = require("../handlers/turi");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth.protect, turiController.getAllTuri);

router.post(
  "/",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.createTura,
);

router.get("/:id", auth.protect, turiController.getOneTura);

router.patch(
  "/:id",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.updateTura,
);

router.delete(
  "/:id",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.deleteTura,
);

router.post(
  "/:id/rezerviraj",
  auth.protect,
  auth.restrictTo("user"),
  turiController.rezervirajTura,
);

router.get(
  "/rezervacii",
  auth.protect,
  auth.restrictTo("admin"),
  turiController.getAllRezervacii,
);
module.exports = router;
