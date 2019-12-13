const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  date: Date
});

module.exports = mongoose.model("Appointment", appointmentSchema);
