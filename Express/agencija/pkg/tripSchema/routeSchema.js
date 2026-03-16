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
});

module.exports = mongoose.model("Route", routeSchema);
