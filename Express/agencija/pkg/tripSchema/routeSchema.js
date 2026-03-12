const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  land: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const routeSchema = new mongoose.Schema(
  {
    stops: [stopSchema],
    pricePerSegment: {
      type: Number,
      required: true,
    },
    maxPassengers: {
      type: Number,
      required: true,
    },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.models.Route || mongoose.model("Route", routeSchema);