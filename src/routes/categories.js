const { Router } = require('express');
const categorieController = require('../controllers/categoriesController');
const loginController = require('../controllers/loginController');

const categoriesRoute = Router();

categoriesRoute.use(loginController.validateToken);
categoriesRoute.post('/', categorieController.add);
categoriesRoute.get('/', categorieController.list);

module.exports = categoriesRoute;