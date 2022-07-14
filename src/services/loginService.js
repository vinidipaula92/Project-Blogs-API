const Joi = require('joi');
const models = require('../database/models');
const jwtService = require('./jwtService');

const loginService = {
  validateBodyAdd(unknown) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(unknown);

    if (error) {
      error.message = 'Some required fields are missing';
      error.code = 400;
      throw error;
    }
    return value;
  },

  login: async (data) => {
    const { email, password } = data;
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.code = 400;
      throw error;
    }

    const token = jwtService.createToken(email);
    return token;
  },

  validateToken: (token) => {
    if (!token) {
      const error = new Error('Token not found');
      error.code = 401;
      throw error;
    }
    const data = jwtService.verifyToken(token);
    return data;
  },
};

module.exports = loginService;