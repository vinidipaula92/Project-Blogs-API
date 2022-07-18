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

  validateBodyUpdate(unknown) {
    const schema = Joi.object({
      title: Joi.string(),
      content: Joi.string(),
    });
    const { error, value } = schema.validate(unknown);

    if (error) {
      error.message = 'Some required fields are missing';
      error.code = 400;
      throw error;
    }
    return value;
  },

  async existsCategoryId(categoryId) {
    const category = await db.Category.findAll({
      where: {
        id: categoryId,
      },
    });
    if (!category.length) {
      const error = new Error('"categoryIds" not found');
      error.code = 400;
      throw error;
    }
    return true;
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

  async add(data, email, categorysId) {
    const user = await db.User.findOne({ where: { email } });
    const post = await db.BlogPost.create({ ...data, userId: user.id });
    const novo = categorysId.map((categoryId) => ({
        categoryId,
        postId: post.id,
      }));
    await db.PostCategory.bulkCreate(novo);
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

  async update(id, email, data) {
    const user = await db.User.findOne({ where: { email } });
    const post = await db.BlogPost.findByPk(id, {
      include: [{ model: db.User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: db.Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    });
    if (post.userId !== user.id) {
      const error = new Error('Unauthorized user');
      error.code = 401;
      throw error;
    }
    await post.update(data);
    return post;
  },
};

module.exports = postService;