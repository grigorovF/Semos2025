const Reservation = require("../../pkg/reservations/rezervationsSchema");
const Route = require("../../pkg/tripSchema/routeSchema");

exports.reserveTrip = async (req, res) => {
  try {
    const { route, fromCity, toCity, passengers } = req.body;

    const routeDoc = await Route.findById(route);

    if (!routeDoc) {
      return res.status(404).json({ message: "Route not found" });
    }
    const fromStop = routeDoc.stops.find((s) => s.city.toString() === fromCity);

    const toStop = routeDoc.stops.find((s) => s.city.toString() === toCity);

    const fromCityDoc = await City.findById(fromCity);
    const toCityDoc = await City.findById(toCity);


    if (!fromStop || !toStop) {
      return res.status(400).json({ message: "Invalid stops" });
    }

    if (fromStop.order >= toStop.order) {
      return res.status(400).json({ message: "Invalid route direction" });
    }

    const distance = await calculateDistance(fromCityDoc, toCityDoc);

    const totalPrice = (distance / 1000) * pricePerKm * passengers;

    const reservation = await Reservation.create({
      user: req.user.id,
      route,
      fromCity,
      toCity,
      passengers,
      totalPrice,
    });

    res.status(201).json({
      message: "Reservation created",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("stops.city", "name").exec();

    res.status(200).json({
      status: "success",
      routes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });

    await route.remove();

    res.status(200).json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate(
      {
        path: "route",
        populate: { path: "stops.city", select: "name" },
      },
    );
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "firstName lastName email")
      .populate({
        path: "route",
        populate: {
          path: "stops.city",
          select: "name",
        },
      });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.payReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "paid" },
      { new: true },
    );
    res.json({ message: "Успешно платено!", reservation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Резервацијата е откажана!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};