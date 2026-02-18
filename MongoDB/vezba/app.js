const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));


mongoose
  .connect("mongodb://127.0.0.1:27017/vina")
  .then(() => console.log("Connected to LOCAL database"))
  .catch((err) => console.log(err));


  app.listen(3000, (err) => {
    if (err) console.log(err.message);
    console.log("Backend strated on port 10000");
  });
  