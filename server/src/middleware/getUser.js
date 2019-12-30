const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUser = async token => {
  let user = null;
  if (token) {
    const email = jwt.verify(token, process.env.JWT_SECRET);
    user = User.findOne({ email: email.toLowerCase() });
  }

  return user;
};

module.exports = getUser;
