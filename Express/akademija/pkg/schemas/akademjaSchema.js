const mongoose = require("mongoose");

const Akademija = new mongoose.Schema(
  {
    ime: {
      type: String,
      require: [true, "Vnesi ime na Akademijata"],
    },

    adresa: {
      type: String,
      require: [true, "Vnesi ja adresata na kursot"],
    },


  },

  { timestamps: true },
);

module.exports = mongoose.model("Akademija", kursSchema);
