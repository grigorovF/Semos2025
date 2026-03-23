const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  stops: [
    {
      city: {
        type: mongoose.Schema.ObjectId,
        ref: "City",
      },
      order: Number,
    },
  ],

  pricePerSegment: Number,
  maxPassengers: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.models.Route || mongoose.model("Route", routeSchema);