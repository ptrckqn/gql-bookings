const serverless = require("serverless-http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const cors = require("cors");

const AppointmentAPI = require("./datasources/appointment");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    appointmentAPI: new AppointmentAPI()
  })
});

server.applyMiddleware({ app, path: "/graphql" });

module.exports.graphqlHandler = serverless(app);

app.listen(4000, () => console.log("🔥🔥🔥 on 4000"));
