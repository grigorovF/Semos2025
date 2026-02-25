const Movie = require('../pkg/movies/movieSchema');

exports.createOne = async (req, res) => {
    try{
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: "success",
            data: {movie,},
        });
    }
    catch(err){
        res.status(501).json({
            status: "fail",
            message: err.message,
        });
    };
}

exports.getOne = async (req, res) => {
    try{
        const movie = await Movie.findById(req.body.params);
        res.status(201).json({
            status: "success",
            data: {
                movie,
            },
        });

    }
    catch(err){
        res.status(501).json({
            status: "fail",
            message: err.message,
        }); 
    };
}

exports.getAll = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.status(200).json({
            data: {movies},
            status: "success",            
        });
    }
    catch(err){
        res.status(501).json({
            status: "fail",
            message: err.message,
        }); 
    };
}

exports.deleteOne = async (req, res) => {
  try {
    await Movie.findByIdAndDelete();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
}


exports.update = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};
  