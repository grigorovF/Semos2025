const express = require("express");
const router = express.Router();
const {
  reserveTrip,
  getMyReservations,
  cancelReservation,
} = require("../handlers/reservationHandler");

const { protect } = require("../middlewares/auth");

const optionalProtect = async (req, res, next) => {
  if (
    req.cookies.jwt ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    return protect(req, res, next);
  }
  next();
};

router.post("/", optionalProtect, reserveTrip);
router.delete("/:id", optionalProtect, cancelReservation);
router.get("/my-reservations", protect, getMyReservations);

module.exports = router;
