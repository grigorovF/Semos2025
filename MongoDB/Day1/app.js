const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const localDB = mongoose.createConnection("mongodb://127.0.0.1:27017/blogs");

localDB.on("connected", () => {
  console.log("Connected to LOCAL database");
});


app.listen(10000, (err) => {
  if (err) console.log(err.message);
  console.log("Backend strated on port 10000");
});
