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

    if (!fromStop || !toStop) {
      return res.status(400).json({ message: "Invalid stops" });
    }

    if (fromStop.order >= toStop.order) {
      return res.status(400).json({ message: "Invalid route direction" });
    }

    const segments = toStop.order - fromStop.order;

    const totalPrice = segments * routeDoc.pricePerSegment * passengers;

    const reservation = await Reservation.create({
      user: req.user.id,
      route,
      fromCity,
      toCity,
      passengers,
      totalPrice
    });

    res.status(201).json({
      message: "Reservation created",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
