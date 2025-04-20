// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tableNumber: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  personCount: { type: String },
  message: { type: String },
});

module.exports = mongoose.model("Reservation", reservationSchema);
