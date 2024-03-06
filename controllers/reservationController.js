const ReservationModel = require("../models/reservationModel");

router.post("/saveReservation", async (req, res) => {
  const { user, date } = req.body;

  if (!user || !date) {
    return res.status(400).json({ error: "User and date are required" });
  }

  try {
    // Check if a reservation with the same date already exists
    const existingReservation = await ReservationModel.findOne({ date });

    if (existingReservation) {
      return res
        .status(400)
        .json({ error: "Reservation with the same date already exists" });
    }

    // If not, save the new reservation
    const newReservation = new ReservationModel({ user, date });
    await newReservation.save();
    res.status(201).json({ message: "Reservation saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getReservations = async (req, res) => {
  try {
    const allReservations = await ReservationModel.find().sort({ date: 1 });
    res.json({ reservations: allReservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.renderIndex = async (req, res) => {
  try {
    const today = new Date();
    const futureReservations = await ReservationModel.find({
      date: { $gt: today },
    }).sort({ date: 1 });

    res.render("index", { futureReservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
