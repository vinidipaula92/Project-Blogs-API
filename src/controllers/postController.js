const jwtService = require('../services/jwtService');
const postService = require('../services/postService');

const postController = {
  async add(req, res) {
    const { authorization } = req.headers;
    const data = postService.validateBodyAdd(req.body);
    const { categoryIds } = data;
    await postService.existsCategoryId(categoryIds);
    const user = jwtService.verifyToken(authorization);
    const post = await postService.add(data, user, categoryIds);
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

  async update(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const data = postService.validateBodyUpdate(req.body);
    await postService.existPostId(id);
    const user = jwtService.verifyToken(authorization);
    const post = await postService.update(id, user, data);
    res.status(200).json(post);
  },

  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    await postService.existPostId(id);
    const user = jwtService.verifyToken(authorization);
    await postService.delete(id, user);
    res.sendStatus(204);
  },
  async search(req, res) {
    const { q } = req.query;
    const data = await postService.search(q);
    res.status(200).json(data);
  },
};

module.exports = postController;