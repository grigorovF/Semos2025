const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
  .connect("mongodb://localhost:27017/blogs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



app.post("/blogs", require("./controller/blogController").createBlog);
app.get("/blogs", require("./controller/blogController").getAllBlogs);
app.delete("/blogs/:naslov", require("./controller/blogController").deleteBlog);

app.listen(5000, (err) => {
    if(err){
        console.log("Error starting server:", err);
    } else {
        console.log("Server is running on port 5000");
    }
});