const Reservation = require("../../pkg/reservations/rezervationsSchema");
const Route = require("../../pkg/routesSchema/routesSchema");

exports.reserveTrip = async (req, res) => {
  try {
    const { route, fromCity, toCity, passengers } = req.body;

    const routeDoc = await Route.findById(route);

    if (!routeDoc) {
      return res.status(404).json({ message: "Route not found" });
    }

    const fromStop = routeDoc.stops.find((s) => s.city === fromCity);
    const toStop = routeDoc.stops.find((s) => s.city === toCity);

    if (!fromStop || !toStop) {
      return res.status(400).json({ message: "Invalid stops" });
    }

    if (fromStop.order >= toStop.order) {
      return res.status(400).json({ message: "Invalid route direction" });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      route,
      fromCity,
      toCity,
      passengers,
    });

    res.status(201).json({
      message: "Reservation created",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
