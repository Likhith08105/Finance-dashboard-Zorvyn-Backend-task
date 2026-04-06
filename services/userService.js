// User service
const User = require('../models/User');

module.exports = {
  async createUser(data) {
    return await User.create(data);
  },
  async listUsers() {
    return await User.find();
  }
};
