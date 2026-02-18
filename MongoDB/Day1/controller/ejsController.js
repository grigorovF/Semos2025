const Blog = require("../models/blogModel");

exports.getLanding = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("landing", {
      blogs: blogs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error with DB");
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({vreme: 1});
   
    res.render("getAllBlogs", {
      blogs: blogs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error with DB");
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    // console.log(blogId);

    // if (!blog) {
    //   return res.status(404).send("Blog not found");
    // }
    res.render("getOneBlog", { blog });
  } catch (err) {
    console.log("ERROR FULL:", err);
    res.status(500).send("error with DB");
  }
};


exports.createBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.redirect("/getAllBlogs");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      message: err.message,
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.findByIdAndDelete(blogId);
    res.redirect("/api/v1/landing");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      message: "Something went wrong while deleting the blog",
    });
  }
};
  