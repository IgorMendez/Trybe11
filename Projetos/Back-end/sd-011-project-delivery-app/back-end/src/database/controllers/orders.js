const { Sale, User, Product, SalesProduct } = require('../models');

const createSale = async (req, res) => {
  const { total_price, user_id, seller_id, delivery_address, delivery_number, status, products } = req.body
  const sale = await Sale.create(
    { total_price, user_id, seller_id, delivery_address, delivery_number, status },
  );
  const sale_id = sale.dataValues.id;
  const saleProduct = products.map(async ({ product, quantity }) => {
    const register = await SalesProduct.create({ product_id: product.id, sale_id, quantity });
    return register;
  });

  await Promise.all(saleProduct);

  const getSale = await findSale(sale_id);

  return res.status(201).json(getSale);
};


const getAllSales = async (req, res) => {
  const { authorization2 } = req.headers;
  const authorizate = authorization2.split(',')
  if(authorizate[0] === 'customer') {
    const sales = await Sale.findAll({where: {user_id: Number(authorizate[1])}});
    return res.status(200).json(sales);
  }
  const sellerSale = await Sale.findAll({where: {seller_id: Number(authorizate[1])}});
    return res.status(200).json(sellerSale);
};

const getOneSale = async (req, res) => {
  const { id } = req.params;
  const sale = await findSale(id);
  console.log(sale);
  return res.status(200).json(sale);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Sale.update({ status }, { where: { id } });
  const saleUpdated = await findSale(id);
  return res.status(200).json(saleUpdated);
};

const findSale = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Product, as: 'product', though: { attributes: [] } },
    ],
  });
  return sale;
};

module.exports = {
  getAllSales,
  createSale,
  getOneSale,
  updateStatus
}
