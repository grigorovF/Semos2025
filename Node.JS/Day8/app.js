//!MVP - arhitektura

const express = require("express");
const calculator = require("./controller/calculator");

const app = express();
app.get("/bmi/:weight/:height", calculator.bmiCalcullator);

app.listen(10000, (err) => {
    if (err) return console.log(err.message);
    console.log("Server started")
})