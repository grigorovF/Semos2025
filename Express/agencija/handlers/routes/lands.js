const express = require("express");
const router = express.Router();

const Land = require("../../pkg/tripSchema/landSchema");

router.post("/add", async (req, res) => {
  const land = await Land.create(req.body);
  res.json(land);
});


router.get("/", async (req, res) => {
  try {
    const lands = await Land.find();
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
