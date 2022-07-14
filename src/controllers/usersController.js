const usersService = require('../services/userService');

const usersController = {
  async list(_req, res) {
    const users = await usersService.list();
    res.status(200).json(users);
  },
  async add(req, res) {
    const data = await usersService.validateBodyAdd(req.body);
    await usersService.existsEmail(data.email);
    const token = await usersService.add(data);
    res.status(201).json({ token });
  },
  async get(req, res) {
    const user = await usersService.get(req.params.id);
    res.status(200).json(user);
  },
};

module.exports = usersController;