const { Product } = require('../models');
var fs = require('fs');
const path = require('path');

const getAllProducts = async (_req, res) => {
  const getProducts = await Product.findAll();
  return res.status(200).json(getProducts);
}

const getImage = (req, res) => {
  const {url} = req.params;
  const data = fs.readFileSync(path.join(__dirname, `../../images/${url}`));

  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  return res.end(data);
}

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const getProduct = await Product.findOne({ where: { id } });
  if(!getProduct) {
    return res.status(400).json({ message: 'product not found' })
  }
  return res.status(200).json(getProduct);
}

module.exports = {
  getAllProducts,
  getImage,
  getOneProduct
};
