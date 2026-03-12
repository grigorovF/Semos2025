const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  city: String,
  land: String,
  order: Number,
});

const routeSchema = new mongoose.Schema({
  stops: [stopSchema],
  maxPassengers: Number,
  pricePerSegment: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Route", routeSchema);
