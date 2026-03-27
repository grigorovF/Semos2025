const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  stops: [
    {
      city: { type: mongoose.Schema.ObjectId, ref: "City" },
      order: Number,
    },
  ],
  pricePerKm: {
    type: Number,
    required: true
  },
  pricePerSegment: Number,
  maxPassengers: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Route", routeSchema);
