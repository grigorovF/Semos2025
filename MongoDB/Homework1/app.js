const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const addNivaController = require('./controller/nivaController');
const niva = require('./models/niva');


mongoose.connect('mongodb://localhost:27017/niva').
    then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

mongoose.connect("mongodb+srv://username:password@cluster0.xxxxxx.mongodb.net/Semos1.zemjodelie?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB on cluster"))
  .catch((err) => console.log(err));

        


app.post("/niva", addNivaController.dodajNiva);
app.get("/niva", addNivaController.prikaziNivi);
app.listen(10000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 10000");
  }
});