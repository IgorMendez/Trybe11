const { User } = require('../models');

const userLogin = (req, res) => res.status(200).json(req.headers.authorization);

const getSellers = (_req, res) => {
  return User.findAll({where: {role: 'seller'}})
    .then((result) => res.status(200).json(result))
}

module.exports = {
  userLogin,
  getSellers,
}