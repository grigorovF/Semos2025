// pkg>schemas>assessmentSchema.js
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Predmet",
    required: true,
  },

  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Korisnik",
    required: true,
  },

  name: String,

  maxPoints: Number,

  weight: Number,
});

module.exports = mongoose.model("Assessment", assessmentSchema);