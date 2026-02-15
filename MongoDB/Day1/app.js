const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const onlineDB = mongoose.createConnection(
  "mongodb+srv://fgrigorov:Svetinikole1!@cluster0.slnkuyn.mongodb.net/?appName=Cluster0",
);

onlineDB.on("connected", () => {
  console.log("Connected to ONLINE database");
});

const localDB = mongoose.createConnection("mongodb://127.0.0.1:27017/blogs");

localDB.on("connected", () => {
  console.log("Connected to LOCAL database");
});


  app.listen(10000, (err) => {
  if (err) console.log(err.message);
  console.log("Backend strated on port 10000");
});
