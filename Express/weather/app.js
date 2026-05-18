//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// 6f19d3b846570786bda883206f390f0d


const express = require("express");
const app = express();
const weather = require("./handler/weather");

app.get('/api/v1/weather/:city', weather.getCity);

app.listen(5005, (err) => {
    if (err) return console.log("Server error!");
    console.log("server started  successfully");
})