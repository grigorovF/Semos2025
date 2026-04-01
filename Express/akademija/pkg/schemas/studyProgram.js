// pkg>schemas>studyProgram.js
const mongoose = require("mongoose");

const studyProgramSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("StudyProgram", studyProgramSchema);
