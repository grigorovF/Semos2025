const express = require("express");
const router = express.Router();

const tripController = require("../../handlers/tirps/trips"); 
const { protect, restrictTo } = require("../../middelwares/auth"); 

router.post("/add-trip", protect, restrictTo("admin"), tripController.addTrip);
router.delete("/:id", protect, restrictTo("admin"), tripController.deleteTrip);

module.exports = router;
