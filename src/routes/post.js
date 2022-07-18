const { Router } = require('express');
const postController = require('../controllers/postController');
const loginController = require('../controllers/loginController');

const postRoute = Router();

postRoute.use(loginController.validateToken);
postRoute.post('/', postController.add);
postRoute.get('/', postController.list);
postRoute.get('/:id', postController.get);
postRoute.put('/:id', postController.update);

module.exports = postRoute;