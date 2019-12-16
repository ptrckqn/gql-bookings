const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUser = async token => {
  const res = jwt.verify(token, process.env.JWT_SECRET);
  if (res) {
    const user = await User.findOne({ email: res.toLowerCase() });
    if (user) {
      return user.email;
    } else {
      return;
    }
  } else {
    return;
  }
};

module.exports = getUser;
