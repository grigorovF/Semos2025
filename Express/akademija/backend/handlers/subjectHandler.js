const Subject = require("../pkg/schemas/subjectSchema");

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      status: "success",
      data: subject,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("studyProgram profesor");

    res.status(200).json({
      status: "success",
      result: subjects.length,
      data: subjects,
    });
  } catch (err) {
    res.status(500).json({
        message: err.message,
    })
  }
};

exports.getSubject = async (req, res) =>{
    try{
        const subject = await Subject.findById(req.params.id).populate("studyProgram profesor");
        
        if (!subject){
            res.status(404).json({
                message: "Subject not found"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.deleteSubject = async (req, res) => {
  try{
    await Subject.findByIdAndDelete(req.params.id);

     res.status(204).json({
      status: "success",
      data: null,
     })
  }
  catch(err){
    res.status(500).json({
      message: err.message,
    });
  };
}