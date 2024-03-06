const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const reservationController = require("./controllers/reservationController");
require("dotenv").config();

const app = express();
const port = 3008;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const mongoURI = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the routes
app.use("/api", routes);

// Endpoint to render the form and saved reservations
app.get("/", reservationController.renderIndex);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
