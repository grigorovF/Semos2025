const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    maxPassengers: {
      type: Number,
      required: true,
    },

    reservedPassengers: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Trip", tripSchema);
