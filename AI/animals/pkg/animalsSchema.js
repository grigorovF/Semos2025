const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  habitat: String,
  diet: String,
  lifespan: Number,
  weight: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;