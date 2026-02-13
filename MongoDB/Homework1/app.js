const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const niva = require('./controller/nivaController');
const nivaModel = require('./models/niva');


mongoose.connect('mongodb://localhost:27017/niva').
    then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));



app.post("/niva", niva.dodajNiva);
app.get("/niva", niva.prikaziNivi);
app.listen(10000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 10000");
  }
});