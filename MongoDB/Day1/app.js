const mongoose = require("mongoose");
const express = require("express");
const ejsController = require("./controller/ejsController")

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


mongoose
  .connect("mongodb://127.0.0.1:27017/blogs")
  .then(() => console.log("Connected to LOCAL database"))
  .catch((err) => console.log(err));



app.get("/singleBlog/:id", ejsController.getOneBlog);

app.get("/addBlogs", (req, res) => {
  res.render("addBlogs");
});

app.post("/addBlogs", ejsController.createBlog);
app.get("/getAllBlogs", ejsController.getAllBlogs);

app.delete("/deleteBlog/:id", ejsController.deleteBlog);

app.listen(10000, (err) => {
  if (err) console.log(err.message);
  console.log("Backend strated on port 10000");
});
