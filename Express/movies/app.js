const dotenv = require("dotenv");
const express = require("express");
const app = express();
const db = require("./pkg/db/index");
const auth = require('./handlers/authHandler');
const movies = require('./handlers/movie');


app.use(express.urlencoded({ extended: true }));
app.use(express.json);

db.init();

app.post("/api/v1/signup", auth.signup);
// app.post("/api/v1/login");

//CRUD
app.get("/movies", movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.createOne);
app.patch("/movies/:id", movies.update);
app.delete("/movies/:id", movies.deleteOne);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(`Service started successfully ${process.env.PORT}`);
});
