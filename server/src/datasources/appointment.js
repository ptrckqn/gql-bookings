const { DataSource } = require("apollo-datasource");
const Appointment = require("../models/appointment");
const {
  startOfDay,
  endOfDay,
  setHours,
  startOfHour,
  addHours,
  parseISO
} = require("date-fns");

class AppointmentAPI extends DataSource {
  async getAllAppointments({ date }) {
    let res = null;
    if (date) {
      let formattedDate;
      if (parseInt(date)) {
        formattedDate = parseInt(date);
      } else {
        formattedDate = date;
      }
      const startDate = startOfDay(new Date(formattedDate));
      const endDate = endOfDay(new Date(formattedDate));

      res = await Appointment.find({
        date: { $gte: startDate, $lt: endDate }
      }).sort({ date: 1 });
    } else {
      res = await Appointment.find({}).sort({ date: 1 });
    }

    return Array.isArray(res)
      ? res.map(appointment => this.appointmentReducer(appointment))
      : [];
  }

  async getAppoinemnt({ id, name, email, date }) {
    const res = await Appointment.findOne({
      $or: [{ name: name }, { email: email }, { date: date }]
    });
    return this.appointmentReducer(res);
  }

  async bookAppoinment({ name, email, phone, date, meeting, location }) {
    let appoinment = new Appointment({
      name,
      email,
      phone,
      date: new Date(date),
      meeting,
      location
    });

    const res = await appoinment.save();
    return {
      success: true,
      message: "appointment booked successfully",
      id: res._id,
      name: res.name,
      email: res.email,
      date: res.date
    };
  }

  async cancelAppoinment({ date }) {
    const res = await Appointment.deleteOne({
      date: date
    });
    return {
      success: true,
      message: "Appoinment cancelled successfully"
    };
  }

  async bookDay({ date }) {
    let day = setHours(new Date(date), 9);
    const endDay = setHours(day, 17);
    while (day < endDay) {
      let appoinment = new Appointment({
        name: "UNAVAILABLE",
        email: "UNAVAILABLE",
        date: new Date(day)
      });

      const res = await appoinment.save();

      day = addHours(day, 1);
    }

    return {
      success: true,
      message: "Day blocked successfully"
    };
  }

  async cancelDay({ date }) {
    const startDate = startOfDay(new Date(date));
    const endDate = endOfDay(new Date(date));
    const res = await Appointment.deleteMany({
      date: { $gte: startDate, $lt: endDate }
    });
    return {
      success: true,
      message: "Appoinments cancelled successfully"
    };
  }

  appointmentReducer(appointment) {
    return {
      id: appointment._id || "",
      name: appointment.name || "",
      email: appointment.email || "",
      phone: appointment.phone || "",
      date: appointment.date || "",
      meeting: appointment.meeting || "",
      location: appointment.location || ""
    };
  }
}

module.exports = AppointmentAPI;
