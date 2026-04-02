// pkg>schemas>counterSchema.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    studyProgram: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "StudyProgram",
        required: true,
    },

    year: {
        type: Number,
        required: true,
    },

    seq: {
        type: Number,
        default: 0,
    },
});

counterSchema.index({studyProgram: 1, year:1}, {unique: true});

module.exports = mongoose.model("Counter", counterSchema);