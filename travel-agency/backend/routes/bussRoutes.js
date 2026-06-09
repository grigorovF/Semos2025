const express = require('express');
const router = express.Router();
const { 
    addBuss, 
    updateBuss,
    deleteBuss,
    getAllBusses,
    updateSeatConfig,
    getBussSeats,
} = require("../handlers/bussHandler");

router.post("/add-buss", addBuss);
router.patch("/update-buss/:id", updateBuss);
router.delete("/delete-buss/:plateNumber", deleteBuss);
router.get("/all-busses", getAllBusses);
router.patch("/seat-config/:id", updateSeatConfig);
router.get("/buss-seats/:busId", getBussSeats);

module.exports = router;