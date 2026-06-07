const express = require('express');

const router = express.Router();
const { addBuss, 
        getAllBusses,
        deleteBus,
        updateBus
} = require("../handlers/busController");

router.post("/add-bus", addBuss);

router.get("/all-buses", getAllBusses);

router.patch("/update-bus/:id", updateBus);

router.delete("/delete-bus/:plateNumber", deleteBus);

module.exports = router;