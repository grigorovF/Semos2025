const mongoose = require("mongoose");

const kursSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      require: [true, "Vnesi ime na kurs"],
    },

    adresa: {
      type: String,
      require: [true, "Vnesi ja adresata na kursot"],
    },

    oblast: {
      type: String,
      require: [true, "Mora da ima oblast za koja e namenet"],
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Kurs", kursSchema);
