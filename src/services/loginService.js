const jwt = require('jsonwebtoken');
const db = require('../database/models');
require('dotenv/config');

const loginService = {
  login: async (email, password) => {
    const user = await db.User.findOne({
      where: { email, password },
    });
    if (!user) return null;

    const token = jwt.sign({ data: email }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = loginService;