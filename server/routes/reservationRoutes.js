// routes/reservationRoutes.js
const express = require("express");
const router = express.Router();

const {
  createReservation,
  getReservations,
  deleteReservation,
} = require("../controllers/reservationController");

// Routes
router.post("/", createReservation);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);

module.exports = router;
