const { Sale, Product, SalesProduct} = require('../models');

const findAll = async () => {
  const result = await SalesProduct.findAll({
    include: [
      { model: Sale, as: 'sale' },
      { model: Product, as: 'products', through: { attributes: [] } },
    ],
  });

  return result;
};

module.exports = {
  findAll,
}