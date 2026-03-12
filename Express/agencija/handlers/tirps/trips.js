const Trip = require("../../pkg/tripSchema/tripSchema");

exports.addTrip = async (req, res) => {
  try {
    const { from, to, price, maxPassengers, startDate, endDate } = req.body;

    const existingTrip = await Trip.findOne({
      from,
      to,
      price,
      maxPassengers,
      startDate,
      endDate,
    });

    if (existingTrip) {
      return res.status(400).json({
        status: "fail",
        message: "Trip already exists",
      });
    }

    const trip = await Trip.create({
      from,
      to,
      price,
      maxPassengers,
      startDate,
      endDate,
    });

    res.status(201).json({
      status: "success",
      message: "New trip is added!",
      trip,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const id = req.params.id;

    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      return res.status(401).json({ message: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
