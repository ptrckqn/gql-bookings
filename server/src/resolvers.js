module.exports = {
  Query: {
    appointments: (_, { date }, { appointmentAPI }) => {
      return appointmentAPI.getAllAppointments({ date });
    },
    appointment: (_, { id, name, email, date }, { appointmentAPI }) =>
      appointmentAPI.getAppoinemnt({ id, name, email, date })
  },

  Mutation: {
    bookAppoinment: (
      _,
      { name, email, phone, date, meeting, location },
      { appointmentAPI }
    ) => {
      return appointmentAPI.bookAppoinment({
        name,
        email,
        phone,
        date,
        meeting,
        location
      });
    },

    cancelAppoinment: (_, { date }, { user, appointmentAPI }) => {
      if (!user) return null;
      return appointmentAPI.cancelAppoinment({ date });
    },

    bookDay: (_, { date }, { user, appointmentAPI }) => {
      if (!user) return null;
      return appointmentAPI.bookDay({ date });
    },
    cancelDay: (_, { date }, { user, appointmentAPI }) => {
      if (!user) return null;
      return appointmentAPI.cancelDay({ date });
    },
    registerUser: (_, { email, password }, { userAPI }) =>
      userAPI.registerUser({ email, password }),
    loginUser: (_, { email, password }, { userAPI }) =>
      userAPI.loginUser({ email, password })
  }
};
