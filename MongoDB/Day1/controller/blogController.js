const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};
