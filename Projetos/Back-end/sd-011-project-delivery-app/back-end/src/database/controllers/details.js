const { SalesProduct } = require('../models')
const productsService = require('../services/productsSale');

const getProducts = async (req, res) => {
  const { id } = req.params;
  // console.log(SalesProduct);
  const getProducts = await SalesProduct.findAll({ where: { sale_id: id } });
  console.log(getProducts);
  // return res.status(200).json(getProducts);
  // const result = await productsService.findAll();
  // console.log(result);
  // res.status(200).json(result);
  // include: [{ model: Product, as: 'product_id' }, { model: sales, as: 'sales_id' }], 
}



module.exports = {
  getProducts,
}