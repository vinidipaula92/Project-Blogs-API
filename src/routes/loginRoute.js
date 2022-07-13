const { Router } = require('express');
const loginController = require('../controllers/loginController');

const authRoute = Router();

authRoute.post('/', loginController.login);

module.exports = authRoute;