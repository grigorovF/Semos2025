const mongoose = require("mongoose");

const vinoSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Mora da ima ime na vinoto"],
  },
  sorta: {
    type: String,
    required: [true, "Mora da ima sorta"],
  },
  ocenka: {
    type: Number,
    default: 3,
  },
  godinaNaBerba: {
    type: Number,
  },
});