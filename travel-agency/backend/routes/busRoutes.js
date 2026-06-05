const express = require('express');

const router = express.Router();
const { addBuss, 
        getAllBuses,
        deleteBus,
        updateBus
} = require("../handlers/busController");

router.post("/add-bus", addBuss);

router.get("/all-buses", getAllBuses);

router.patch("/update-bus/:plateNumber", updateBus);

router.delete("/delete-bus/:plateNumber", deleteBus);

module.exports = router;