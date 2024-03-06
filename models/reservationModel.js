const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const ReservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = ReservationModel;
