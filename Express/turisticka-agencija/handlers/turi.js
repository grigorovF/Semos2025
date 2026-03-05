const mongoose = require("mongoose");
const Tura = require("../pkg/turi/turiSchema");
const Rezervacija = require("../pkg/rezervacija/rezervacijaSchema");


exports.createTour = async (req, res) => {
  try {
    const tour = await Tura.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getAllTours = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const tours = await Tura.find();
      return res.status(200).json(tours);
    }

    const user = await req.user.populate({
      path: "rezerviraniTuri",
      populate: { path: "tura" },
    });

    res.status(200).json(user.rezerviraniTuri);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tura.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tura.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    res.status(200).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tura.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found",
      });
    }

    res.status(200).json({
      message: "Tour deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reserveTour = async (req, res) => {
  try {
    const { departureDate, returnDate } = req.body;

    const tour = await Tura.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found",
      });
    }

    if (!tour.departureDate || !tour.returnDate) {
      return res.status(400).json({
        message: "Tour does not have defined dates",
        tour,
      });
    }

    const tourDeparture = new Date(tour.departureDate).getTime();
    const tourReturn = new Date(tour.returnDate).getTime();

    const userDeparture = new Date(departureDate).getTime();
    const userReturn = new Date(returnDate).getTime();

    if (tourDeparture !== userDeparture || tourReturn !== userReturn) {
      return res.status(400).json({
        message: "Selected dates do not match",
        suggestedDates: {
          departureDate: tour.departureDate,
          returnDate: tour.returnDate,
        },
      });
    }

    const reservation = await Rezervacija.create({
      user: req.user._id,
      tura: tour._id,
    });

    res.status(201).json({
      message: "Reservation successful",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Rezervacija.find()
      .populate("user", "name email")
      .populate("tura");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
