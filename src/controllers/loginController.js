const loginService = require('../services/loginService');

const loginController = {
  login: async (req, res) => {
    const validate = loginService.validateBodyAdd(req.body);
    const token = await loginService.login(validate);
    res.status(200).json({ token });
  },

  validateToken: async (req, res, next) => {
    const { authorization } = req.headers;
    const user = loginService.validateToken(authorization);
    req.user = user;
    next();
  },
};

module.exports = loginController;