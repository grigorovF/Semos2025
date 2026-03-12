const express = require("express");
const router = express.Router();

const City = require("../../pkg/tripSchema/citySchema");


router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.land) filter.drzava = req.query.land;
    const cities = await City.find(filter).populate("drzava", "landName");
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/add", async (req, res) => {
  const city = await City.create(req.body);
  res.json(city);
});
module.exports = router;
