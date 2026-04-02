//pkg > schemas > subjectSchema.js
const mongoose = require("mongoose");

const predmetSchema = new mongoose.Schema(
  {
    ime: {
      type: String,
      required: true,
    },

    godina: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },

    studyProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studyProgram",
      required: true
    },

    semestar: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
      required: true,
    },

    ekts: {
      type: Number,
      required: true,
    },

    profesor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Korisnik",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Predmet", predmetSchema);