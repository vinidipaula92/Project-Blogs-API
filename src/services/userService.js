const Joi = require('joi');
const models = require('../database/models');

const usersService = {
  async validateBodyAdd(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().max(255),
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
      image: Joi.string().max(255),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },

  async add(data) {
    const user = await models.User.create(data);
    return user;
  },

  async list() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
};

module.exports = usersService;