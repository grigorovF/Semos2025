const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Korisnik",
  },

  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
  },

  points: Number,
});

module.exports = mongoose.model("studentResult", resultSchema);