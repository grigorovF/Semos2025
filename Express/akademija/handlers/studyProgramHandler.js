// handlers>studyProgramHandler.js

const studyProgram = require('../pkg/schemas/studyProgram');

exports.addProgram = async (req, res) => {
    try{
        const Program = await studyProgram.create({
            ime: req.body.ime,
        });
        
        res.status(201).json({
            status: "success",
        });
    }
    catch(err){
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};


exports.deleteProgram = async (req, res) => {
    try {
        const program = await StudyProgram.findByIdAndDelete(req.params.id);

        if (!program) {
            return res.status(404).json({
                status: "fail",
                message: "Program not found"
            });
        }

        res.status(204).json({
            status: "success",
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};