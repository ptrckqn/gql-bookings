module.exports = {
  Query: {
    appointments: (_, { date }, { dataSources }) =>
      dataSources.appointmentAPI.getAllAppointments({ date }),
    appointment: (_, { id, name, email, date }, { dataSources }) =>
      dataSources.appointmentAPI.getAppoinemnt({ id, name, email, date })
  },

  Mutation: {
    bookAppoinment: (_, { name, email, date }, { dataSources }) =>
      dataSources.appointmentAPI.bookAppoinment({ name, email, date }),
    cancelAppoinment: (_, { date }, { dataSources }) =>
      dataSources.appointmentAPI.cancelAppoinment({ date }),
    bookDay: (_, { date }, { dataSources }) =>
      dataSources.appointmentAPI.bookDay({ date }),
    cancelDay: (_, { date }, { dataSources }) =>
      dataSources.appointmentAPI.cancelDay({ date }),
    registerUser: (_, { email, password }, { dataSources }) =>
      dataSources.userAPI.registerUser({ email, password }),
    loginUser: (_, { email, password }, { user, dataSources }) => {
      if (user) return dataSources.userAPI.loginUser({ email, password });
      return;
    }
  }
};
