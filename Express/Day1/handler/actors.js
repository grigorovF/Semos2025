const Actor = require("../pkg/movies/actorSchema");


exports.createActor = async (req, res) => {
  try {
    const newActor = await Actor.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        actor: newActor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const actors = await Actor.find();

    res.status(200).json({
      status: "success",
      results: actors.length,
      data: {
        actors,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);

    if (!actor) {
      return res.status(404).json({
        status: "fail",
        message: "Actor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        actor,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!actor) {
      return res.status(404).json({
        status: "fail",
        message: "Actor not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        actor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);

    if (!actor) {
      return res.status(404).json({
        status: "fail",
        message: "Actor not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};