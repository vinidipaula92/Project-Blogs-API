const categorieService = require('../services/categoriesService');

const categorieController = {
  async add(req, res) {
    const data = categorieService.validateBodyAdd(req.body);
    const categorie = await categorieService.add(data);
    res.status(201).json(categorie);
  },
  async list(req, res) {
    const categories = await categorieService.list();
    res.status(200).json(categories);
  },
};

module.exports = categorieController;