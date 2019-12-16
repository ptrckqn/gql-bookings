const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    appointments(date: String): [Appointment]!
    appointment(id: ID, name: String, email: String, date: String): Appointment
  }

  type Appointment {
    id: ID!
    name: String!
    email: String
    date: String!
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
    token: String
  }

  type Mutation {
    bookAppoinment(
      name: String!
      email: String
      date: String!
    ): BookingUpdateResponse!
    cancelAppoinment(date: String!): BookingUpdateResponse!
    bookDay(date: String!): BookingUpdateResponse!
    cancelDay(date: String!): BookingUpdateResponse!
    registerUser(email: String!, password: String!): UserUpdateResponse!
    loginUser(email: String!, password: String!): UserUpdateResponse!
  }

  type BookingUpdateResponse {
    success: Boolean!
    message: String
    id: ID
    name: String
    email: String
    date: String
  }
`;

module.exports = typeDefs;
