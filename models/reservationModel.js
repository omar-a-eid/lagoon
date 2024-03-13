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
  restID: {
    type: String,
    required: true,
    enum: ["revira1", "revira2"],
  },
});

const ReservationModel = mongoose.model("Reservation", reservationSchema);

module.exports = ReservationModel;
