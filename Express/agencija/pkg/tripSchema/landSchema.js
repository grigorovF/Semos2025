const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  landName: {
    type: String,
    required: [true, "You must enter the country"]
  },
});

module.exports = mongoose.model("Land", landSchema);
