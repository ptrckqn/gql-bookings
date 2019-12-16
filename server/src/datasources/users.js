const { DataSource } = require("apollo-datasource");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserAPI extends DataSource {
  async registerUser({ email, password }) {
    const saltRounds = 10;

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return { success: false, message: "Email already registed" };
    } else {
      const hash = await bcrypt.hash(password, saltRounds);

      let user = new User({
        email: email.toLowerCase(),
        password: hash
      });

      const res = await user.save();
      if (res) {
        const token = jwt.sign(email, process.env.JWT_SECRET);
        return {
          success: true,
          message: "Successfully registered user",
          token
        };
      } else {
        return { success: false, message: "Error registering user" };
      }
      return { success: true, message: "registered new user successfully" };
    }
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(email, process.env.JWT_SECRET);
        const cert = jwt.verify(token, process.env.JWT_SECRET);
        if (cert) {
          //do what you need to do
        }
        return {
          success: true,
          message: "successfully logged in",
          token
        };
      } else {
        return { success: false, message: "invalid email or password" };
      }
    } else {
      return { success: false, message: "invalid email or password" };
    }
  }
}

module.exports = UserAPI;
