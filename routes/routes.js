const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Save a reservation
router.post("/saveReservation", reservationController.saveReservation);

// Get all reservations
router.get("/getReservations", reservationController.getReservations);

module.exports = router;
