const express = require("express");

const app  = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));

//app.get("/form")
// app.get ("/form")

const model = require('../models/studenti');

app.get ('brishi/:i', (res, req) =>{
    req.params.i;

    
});

app.listen(10000, (err)=>{
    if (err) return console.log(err.message);
    console.log("Server started");
    
});