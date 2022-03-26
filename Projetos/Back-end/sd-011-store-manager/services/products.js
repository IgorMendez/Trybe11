const productsModel = require('../models/products');

const getAll = async () => {
  const product = await productsModel.getAll();

  return product;
};

const getOne = async (id) => {
  const productExist = await productsModel.getOne(id);

  if (!productExist) {
    return { error: 'PRODUCT_NOT_EXIST' };
  }
  return productExist;
};

const updateOne = async (id, product) => productsModel.updateOne(id, product);

const create = async (dataProduct) => {
  const { insert, error } = await productsModel.create(dataProduct);

  if (error) {
    return { err: { code: 'invalid_data', message: error } };
  }
  return insert;
};

const deleteById = async (id) => {
  const productExist = await productsModel.getOne(id);
  const del = await productsModel.deleteById(id);

  if (!productExist) {
    return { error: 'PRODUCT_NOT_EXIST' };
  }
  return del;
};

module.exports = {
  getAll,
  create,
  getOne,
  updateOne,
  deleteById,
};