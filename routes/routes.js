const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Save a reservation
router.post("/saveReservation", reservationController.saveReservation);

router.get("/getReservations/:id", reservationController.getReservations);

module.exports = router;
