const mongoose = require('mongoose');

const nivaSchema = new mongoose.Schema({
    povrsina: {
        type: Number,
        required: true
    },
    mestoVikano: {
        type: String,
        required: true
    },

    katastarskaOpstina: {
        type: String,
        required: true

    },

    poseanaKultura: {
        type: String,
        required: true
    },

    vremeNaPosev: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const niva = mongoose.model('niva', nivaSchema);

module.exports = niva;