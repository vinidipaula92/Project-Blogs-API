const postService = require('../services/postService');

const postController = {
  async add(req, res) {
    const data = await postService.validateBodyAdd(req.body);
    const categoryId = data.some((id) => id.categoryId);
    await postService.existsCategoryId(categoryId);
    const post = await postService.add(data);
    res.status(201).json(post);
  },
  async list(req, res) {
    const data = await postService.list();
    res.status(200).json(data);
  },

  async get(req, res) {
    const { id } = req.params;
    await postService.existPostId(id);
    const post = await postService.get(id);
    res.status(200).json(post);
  },
};

module.exports = postController;