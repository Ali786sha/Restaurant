// controllers/reservationController.js
const Reservation = require("../models/Reservation");

// Create a reservation (user or admin)
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create reservation",
      error: err.message,
    });
  }
};

// Get all reservations (admin dashboard)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching reservations",
      error: err.message,
    });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting reservation",
      error: err.message,
    });
  }
};
