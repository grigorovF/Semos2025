const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const dataPath = path.join(__dirname, "data", "student.json");

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  const data = readData();
  res.render("index", data);
});

app.post("/add", (req, res) => {
  const data = readData();

  const newStudent = {
    id: Date.now(),
    ime: req.body.ime,
    prezime: req.body.prezime,
    prosek: req.body.prosek
  };

  data.studenti.push(newStudent);
  writeData(data);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  data.studenti = data.studenti.filter(s => s.id !== id);
  writeData(data);
  res.redirect("/");
});

app.listen(10000, (err) => {
    if (err) return console.log(err.message);
    console.log("Server started")
})