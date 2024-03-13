const ReservationModel = require("../models/reservationModel");

exports.saveReservation = async (req, res) => {
  const { user, date, restID } = req.body;

  if (!user || !date || !restID) {
    return res
      .status(400)
      .json({ error: "User, date, and restID are required" });
  }

  try {
    // Check if a reservation with the same date and restID already exists
    const existingReservation = await ReservationModel.findOne({
      date,
      restID,
    });

    if (existingReservation) {
      return res.status(400).json({
        error: "Reservation with the same date and restID already exists",
      });
    }

    // If not, save the new reservation
    const newReservation = new ReservationModel({ user, date, restID });
    await newReservation.save();
    res.render("index", {
      successMessage: "Reservation saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReservations = async (req, res) => {
  const { restID } = req.query;

  try {
    const query = restID ? { restID } : {};
    const allReservations = await ReservationModel.find(query).sort({
      date: 1,
    });
    res.json({ reservations: allReservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.renderIndex = async (req, res) => {
  const { restID } = req.query;

  try {
    const today = new Date();
    const query = restID
      ? { restID, date: { $gt: today } }
      : { date: { $gt: today } };
    const futureReservations = await ReservationModel.find(query).sort({
      date: 1,
    });

    res.render("index", { futureReservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
