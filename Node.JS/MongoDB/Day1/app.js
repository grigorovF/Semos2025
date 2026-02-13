const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const blogController = require("./controller/blogControler");
const Blog = require("./model/blogmodel");


mongoose
  .connect(
    "mongodb+srv://fgrigorov:Svetinikole1%21@cluster0.slnkuyn.mongodb.net/Semos1?appName=Cluster0",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err.message));

  app.get("/api/v1/blogs", blogController.getAllBlogs);
  //app.get("/api/v1/blogs/:id");
  app.post("/api/v1/blogs", blogController.createBlog);
  //app.patch("/api/v1/blogs/:id");
  //app.delete("/api/v1/blogs/:id");
  

const blogSchema = new mongoose.Schema({
  naslov: {
    type: String,
    required: [true, "Mora da ima naslov"],
  },

  tekst: {
    type: String,
    required: [true, "Mora da ima tekst"],
  },

  ocenka: {
    type: Number,
    default: 3,
  },

  vreme: {
    type: Date,
    default: Date.now,
  },
});


const testBlog = new Blog({
  naslov: "Kompjuter",
  tekst: "bla bla bla",
  ocenka: 5,
  avtor: "Student",
});

async function getBlogs() {
    try {
        await testBlog.save();
        console.log('bla bla bla');
    }
    catch (err) {
        console.log(err.message);
    }
}

getBlogs();








app.listen(10000, (err) => {
  if (err) console.log(err.message);
  console.log("Server started successfully");
});
