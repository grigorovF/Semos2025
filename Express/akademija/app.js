//app.js
const express = require("express");
const db = require("./pkg/db/db");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(`Service started successfully ${process.env.PORT}`);
});
