const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

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
    const user = await db.User.create({ ...data });
    const token = jwtService.createToken(user.email);
    return token;    
  },

  async list() {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
  async get(id) {
    const user = await db.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      const error = new Error('User does not exist');
      error.code = 404;
      throw error;
    }
    return user;
  },
};

module.exports = usersService;