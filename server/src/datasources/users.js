const { DataSource } = require("apollo-datasource");
const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserAPI extends DataSource {
  async registerUser({ email, password }) {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return err;
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return err;
        }
        let user = new User({
          email: email,
          password: hash
        });

        const res = await user.save();

        return;
      });
    });

    return { success: true, message: "registered new user successfully" };
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return { success: true, message: "successfully logged in" };
      } else {
        return { success: false, message: "invalid email or password" };
      }
    } else {
      return { success: false, message: "invalid email or password" };
    }
  }
}

module.exports = UserAPI;
