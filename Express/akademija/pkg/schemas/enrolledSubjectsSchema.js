// pkg>schemas>enroledSubjects.js
const mongoose = require("mongoose");

const zapisaniPredmetiSchema = new mongoose.Schema(
  {
    korisnik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Korisnik",
      required: true,
    },

    predmet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Predmet",
      required: true,
    },

    status: {
      type: String,
      enum: ["polozen", "nepolozen"],
      default: "nepolozen",
    },

    bodovi: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("zapisaniPredmeti", zapisaniPredmetiSchema);
