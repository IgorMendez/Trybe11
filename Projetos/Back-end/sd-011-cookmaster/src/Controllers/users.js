const userService = require('../Service/users');

const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUserService(userData);
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno 500' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createAdmin(userData);
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno 500' });
  }
};

module.exports = {
  createUserController,
  createAdmin,
};