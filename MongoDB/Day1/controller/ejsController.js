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
    const blogs = await Blog.find();
    res.render("allBlogs", {
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
    res.render("getOneBlog", {
      data: blog,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error with DB");
  }
};

exports.createBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.redirect("/api/v1/landing");
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      message: "Something went wrong",
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
  