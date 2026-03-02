const mongoose = require("mongoose");

const rezervacijaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tura",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Rezervacija", rezervacijaSchema);
