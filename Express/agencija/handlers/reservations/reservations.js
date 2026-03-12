const Reservation = require("../../pkg/reservations/rezervationsSchema");
const Trip = require("../../pkg/tripSchema/tripSchema");


exports.reserveTrip = async (req, res) => {
  try {
    const { trip, passengers } = req.body;

    const foundTrip = await Trip.findById(trip);

    if (!foundTrip) return res.status(404).json({ message: "Trip not found" });

    const availableSeats =
      foundTrip.maxPassengers - foundTrip.reservedPassengers;

    if (passengers > availableSeats)
      return res.status(400).json({
        message: `Only ${availableSeats} seats left`,
      });

    let totalPrice = passengers * foundTrip.price;
    const userReservations = await Reservation.countDocuments({
      user: req.user._id,
    });

    if (userReservations >= 3) {
      totalPrice = totalPrice * 0.7;
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      trip,
      passengers,
      totalPrice,
    });

    foundTrip.reservedPassengers += passengers;
    await foundTrip.save();

    res.status(201).json({
      message: "Reservation successful",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
