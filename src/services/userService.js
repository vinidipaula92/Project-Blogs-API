const Joi = require('joi');
const jwt = require('jsonwebtoken');
const db = require('../database/models');
require('dotenv/config');

const usersService = {
  validateBodyAdd(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().min(8).max(255),
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6).max(255),
      image: Joi.string().max(255),
    });
    const { error, value } = schema.validate(unknown);

    if (error) {
      error.code = 400;
      throw error;
    }
    return value;
  },

  async existsEmail(email) {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      const error = new Error('User already registered');
      error.code = 409;
      throw error;
    }
    return true;
  },

  async add(data) {
    const user = await db.User.create(data);
    const token = jwt.sign(user.email, process.env.JWT_SECRET);
    return token;    
  },

  async list() {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
};

module.exports = usersService;