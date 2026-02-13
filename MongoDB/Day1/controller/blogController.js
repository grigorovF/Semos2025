const blog = require('../models/blogModel');

exports.createBlog = async (req, res) => {
    try{
        const newBlog = await blog.create(req.body);
        res.status(201).json({
            status:"success",
            data: {
                blog: newBlog,
            },
        });
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message,
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try{
        const blogs = await blog.find();
        res.status(200).json({
            status:"success",
            data: {
                blogs: blogs,
            },
        });
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message,
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try{
        await blog.findOneAndDelete({naslov: req.params.naslov})
        res.status(204).json({
            status:"success",
            data: null,
        });
    } 
    catch(err){
        res.status(400).json({
            status:"fail",  
            message: err.message,
        });
    }
};
