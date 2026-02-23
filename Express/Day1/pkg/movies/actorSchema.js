const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "It must have a name"],
    minlength: [1, "Name is too short"],
    maxlength: [1, "Name is too long"],
  },

  prezime: {
    type: String,
    required: [true, "It must have a name"],
    minlength: [1, "Name is too short"],
    maxlength: [1, "Name is too long"],
  },

  vozrast: {
    type: Number,
    min: 2,
  },

  karakter: {
    type: String,
    required: [true, "It must have a name"],
    minlength: [1, "Name is too short"],
    maxlength: [1, "Name is too long"],
  },

  prethodniUlogi: {
    type: String,
    required: [true, "It must have a name"],
    minlength: [1, "Name is too short"],
    maxlength: [1, "Name is too long"],
  },

  slika: {
    type: String,
    default: "default.jpg",
  },

});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;