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

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
        status: "Success",
        data:{
            blog,
        }
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};


exports.getBlog = async (req, res) => {
    try{
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        res.status(201).json({
            status: "success",
            data: {blog},
        });
    }
    catch(err){
        res.status(501).json({
            status: "fail",
            message: err.message,
        })
    }
};

exports.getAllBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(201).json({
            status: "Success",
            data: {blogs},

        });
        //dali tuka, moze da se napravi req.params.od nekoj value, dali range, dali textbox(vo nekoja pretopostavena struktuirana stranica)
        //i da gi filtrira po tie parametri
        //req.ratingMinimum.params = 2.0
        /*try {
          let filter = {};

          if (req.query.ratingMinimum) {
            filter.rating = { $gte: Number(req.query.ratingMinimum) };
          }

          const blogs = await Blog.find(filter);

          res.status(200).json({
            status: "success",
            results: blogs.length,
            data: { blogs },
          });
        } catch (err) {
          res.status(500).json({
            status: "fail",
            message: err.message,
          });
        }*/
    }    catch(err){
      res.status(501).json({
        status: "fail",
        message: err.message,
      });
    }
}