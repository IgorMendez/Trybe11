require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const jwtKey = require("fs")
  .readFileSync('jwt.evaluation.key', { encoding: "utf-8" }).trim();

const postUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordHash = md5(password)
  const token = jwt.sign({ name, email, password: passwordHash }, jwtKey, { encoding: "utf-8" });
  return User.create({ name, email, password: passwordHash, role })
  .then(({dataValues}) => {
    return res.status(201).json({token, role, userId: dataValues.id, name: dataValues.name, email});
  });
}

module.exports = {
  postUser,
}
