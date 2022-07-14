require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (email) => {
    const token = jwt.sign(email, process.env.JWT_SECRET);
    return token;
  },
  verifyToken: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.code = 401;
      throw error;
    }
  },
};

module.exports = jwtService;