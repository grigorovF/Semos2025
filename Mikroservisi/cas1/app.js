const express = require('express');
const app = express();

app.get("api/getAllusers", (req, res) => {
  res.json({
    message: "Get all users",
  });
});

app.get("api/getOneUsers/:id", (req, res) => {
  res.json({
    message: "One user",
  });
});

app.post("/api/createOne", (req, res) => {
  res.json({
    message: "User created",
    data: req.body,
  });
});

app.put("/api/patch/:id", (req, res) => {
  res.json({
    message: "User ${req.params.id} updated",
  });
});


app.delete("api/delete/:id", (req, res) => {
  res.json({
    message: "User ${req.params.id} deleted",
  });
});

app.listen(3000, ()=>{
    console.log("Welcome");
})