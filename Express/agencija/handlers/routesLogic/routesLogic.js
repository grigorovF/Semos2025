const Route = require("../../pkg/tripSchema/routeSchema");
const City = require("../../pkg/tripSchema/citySchema");

exports.addRoute = async (req, res) => {
  try {
    const { city, pricePerSegment, maxPassengers, startDate, endDate } =
      req.body;

    let stops = [];

    const cities = Array.isArray(city) ? city : [city];

    for (let i = 0; i < cities.length; i++) {
      let cityDoc = await City.findOne({ name: cities[i] });

      if (!cityDoc) {
        cityDoc = await City.create({
          name: cities[i],
        });
      }

      stops.push({
        city: cityDoc._id,
        order: i,
      });
    }

    const route = await Route.create({
      stops,
      pricePerSegment,
      maxPassengers,
      startDate,
      endDate,
    });

    res.status(201).json({
      message: "Route created",
      route,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("stops.city", "name"); 
    res.status(200).json({ routes });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getAllRoutesPublic = async (req, res) => {
  try {
    const routes = await Route.find().populate("stops.city", "name");

    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};