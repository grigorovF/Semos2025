const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: [true, "You must enter the city"],
      trim: true,
    },

    drzava: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Land",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("City", citySchema);
