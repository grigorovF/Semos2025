//! npm install express
//! npm install ejs
//! npm install nodemon -g    (-g) -> oznacuva da se instalira globalno isto kako sto go instaliravme npm
//* nodemon pri sekoj save go reloadira serverot da ne mora da se pusta nanovo

//*EJS (Embedded JavaScript templating)
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const testData = {
  data: "This is data",
  data1: "This is data1",
};

let data = {
  ime: "Pero",
  prezime: "Peroski",
  niza: ["Skopje", "Bitola", "Kumanovo", "Tetovo", "Ohrid", "Veles"],
  studenti: [
    { ime: "Pero", prezime: "Perovski", prosek: 10 },
    { ime: "Janko", prezime: "Jankoski", prosek: 7 },
    { ime: "Stanko", prezime: "Stankoski", prosek: 8.4 },
    { ime: "Mara", prezime: "Maroska", prosek: 10 },
    { ime: "Peco", prezime: "Pecoski", prosek: 5 },
  ],
};

app.get("/test", (req, res) => {
  res.render("test", testData);
});

app.get("/index", (req, res) => {
  res.render("index", data);
});


app.post("/index", (req, res) => {
    const newStudent= {
        ime: req.body.ime,
        prezime: req.body.prezime,
        prosek: req.body.prosek,
    };

    data.studenti.push(newStudent);
  res.render("index", data);
});


app.listen(10000, (err) => {
  if (err) return console.log(err.message);
  console.log("Service started on port 10000");
});