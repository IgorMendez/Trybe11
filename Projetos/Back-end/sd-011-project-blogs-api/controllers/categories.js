// const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Categories } = require('../models');

const findAllCategories = (req, res) => Categories.findAll()
    .then((results) => res.status(200).json(results.map((e) => e.dataValues)));

const createCategory = (req, res) => {
  const { name } = req.body;
  return Categories.create({ name })
    .then((category) => res.status(201).json(category.dataValues))
    .catch(() => res.status(500).json({ erro: '500' }));
};

module.exports = {
  createCategory,
  findAllCategories,
};