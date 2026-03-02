const mongoose = require("mongoose");

const turiSchema = new mongoose.Schema({
  pojdovenGrad: {
    type: String,
    required: [true, "Mora da vnesete od kade trgnuvate"],
    enum: [
      "Skopje",
      "Bitola",
      "Ohrid",
      "Prilep",
      "Stip",
      "Strumica",
      "Belgrad",
      "Budimpesta",
      "Praga",
      "Bratislava",
      "Viena",
      "Berlin",
    ],
    trim: true,
  },
  destinacija: {
    type: String,
    required: [true, "Mora da vnesete od kade trgnuvate"],
    enum: [
      "Skopje",
      "Bitola",
      "Ohrid",
      "Prilep",
      "Stip",
      "Strumica",
      "Belgrad",
      "Budimpesta",
      "Praga",
      "Bratislava",
      "Viena",
      "Berlin",
    ],
    trim: true,
  },

  dataNaPoaganje: {
    type: Date,
    required: true,
  },

  dataNaVrakjanje: {
    type: Date,
    required: true,
  },

  prevoznoSredstvo: {
    type: String,
    enum: ["sopstven prevoz", "avion", "avtobus"],
  },

});

module.exports = mongoose.model("Tura", turiSchema);