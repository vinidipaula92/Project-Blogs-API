const Joi = require('joi');
const db = require('../database/models');

const categorieService = {
  validateBodyAdd(unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(unknown);

    if (error) {
      error.code = 400;
      throw error;
    }
    return value;
  },

  async add(data) {
    const categorie = await db.Category.create({ ...data });
    return categorie;
  },

  async list() {
    const categories = await db.Category.findAll();
    return categories;
  },
};

module.exports = categorieService;