const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  date: Date,
  meeting: String,
  location: String,
  address: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
