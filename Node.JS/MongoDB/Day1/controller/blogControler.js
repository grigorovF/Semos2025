const Blog = require("../model/blogmodel");

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);    
    res.status(201).json({
        title: req.body.naslov,
        tekst: req.body.tekst,
        ocenka: req.body.ocenka,
    })
    const savedBlog = await newBlog.save();  
    }
  catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    console.log(err.message);
  };
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}