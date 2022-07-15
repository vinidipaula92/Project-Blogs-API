const Joi = require('joi');
const db = require('../database/models');

const postService = {
  validateBodyAdd(unknown) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
    });
    const { error, value } = schema.validate(unknown);

    if (error) {
      error.message = 'Some required fields are missing';
      error.code = 400;
      throw error;
    }
    return value;
  },

  existsCategoryId(categoryId) {
    const category = db.Category.findbyPk(categoryId);
    if (!category) {
      const error = new Error('"categoryId" not found');
      error.code = 400;
      throw error;
    }
    return category;
  },

  async existPostId(id) {
    const post = await db.BlogPost.findByPk(id);
    if (!post) {
      const error = new Error('Post does not exist');
      error.code = 404;
      throw error;
    }
    return true;
  },

  async add(data) {
    const post = await db.Post.create({ ...data });
    return post;
  },
  async list() {
    const posts = await db.BlogPost.findAll({
      include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        {
          model: db.Category,
          as: 'categories',
          attributes: { exclude: [] },
        }],
    });
    return posts;
  },
  async get(id) {
    const post = await db.BlogPost.findByPk(id, {
      include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        {
          model: db.Category,
          as: 'categories',
          through: { attributes: [] },
        }],
    });
    return post;
  },
};

module.exports = postService;