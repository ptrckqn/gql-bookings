const serverless = require("serverless-http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const cors = require("cors");
const getUser = require("./middleware/getUser");

const AppointmentAPI = require("./datasources/appointment");
const UserAPI = require("./datasources/users");

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

const context = async ({ req }) => {
  const tokenWithBearer = req.headers.authorization || "";
  const token = tokenWithBearer.split(" ")[1];
  const user = await getUser(token);
  return { user, appointmentAPI: new AppointmentAPI(), userAPI: new UserAPI() };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.applyMiddleware({ app, path: "/graphql" });

module.exports.graphqlHandler = serverless(app);

app.listen(4000, () => console.log("Server on 4000"));
