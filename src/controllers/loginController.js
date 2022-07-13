const loginService = require('../services/loginService');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Some required fields are missing',
      });
    }
    const token = await loginService.login(email, password);
    if (!token) return res.status(400).json({ message: 'Invalid fields' });

    res.status(200).json({ token });
  },
};

module.exports = loginController;