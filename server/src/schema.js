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

  type Mutation {
    bookAppoinment(
      name: String!
      email: String
      date: String!
    ): BookingUpdateResponse!
    cancelAppoinment(date: String!): BookingUpdateResponse!
    bookDay(date: String!): BookingUpdateResponse!
    cancelDay(date: String!): BookingUpdateResponse!
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
