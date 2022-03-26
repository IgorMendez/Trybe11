const twj = require('jsonwebtoken');

const modelUsers = require('../Models/users');

const secret = 'segredo';

const checkPass = async (req, res, next) => {
  const { body } = req;
  const authEmail = await modelUsers.getOneByEmail(body.email);
  if (!authEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const encrypt = twj.sign({ email: body.email, password: body.password }, secret);
  next();
  return res.status(200).json({ token: encrypt }); 
};

module.exports = {
  checkPass,
};