const Course = require("../../../pkg/courses/courseSchema");

exports.getAll = async (req, res) => {
  const courses = await Course.find();

  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
};

exports.create = async (req, res) => {
  try {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      creator: req.auth.id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMine = async (req, res) => {
  const courses = await Course.find({
    creator: req.auth.id,
  });

  res.status(200).json(courses);
};
