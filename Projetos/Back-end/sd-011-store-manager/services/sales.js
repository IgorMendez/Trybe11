const salesModels = require('../models/sales');

const productSolded = async (products) => {
  const { result } = await salesModels.productSolded(products);
  return { result };
};

const getAllSales = async () => {
  const get = await salesModels.getAllSales();
  console.log(get);
  return { get };
};

const getById = async (id) => {
  const data = await salesModels.getById(id);

  if (!data) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return { data };
};

const salesUpdate = async (id, itensSold) => {
  const dataIsValid = await salesModels.salesUpdate(id, itensSold);

  if (!dataIsValid) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const data = await salesModels.getById(id);
  return { data };
};

const deleteSale = async (id) => {
  const deletSale = await salesModels.deleteSale(id);
  if (deletSale === null) return { erro: 'NOT_FOUND' };
  return deletSale;
};

module.exports = {
  productSolded,
  getAllSales,
  getById,
  salesUpdate,
  deleteSale,
};