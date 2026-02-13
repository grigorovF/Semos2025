const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    naslov: {
        type: String,
        required: [true, "Mora da ima naslov"],
    },

    tekst: {
        type: String,
        required: [true, "Mora da ima sodrzina"],
    },

    avtor: {
        type: String,
        required: [true, "Mora da ima avtor"],
    },

    ocenka: {
        type: Number,
        default: 3,
    },

    vreme :{
        type: Date,
        default: Date.now,
    },

});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;