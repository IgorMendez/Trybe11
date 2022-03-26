const productsService = require('../services/products');
const procutsModel = require('../models/products');

async function getAll(_req, res) {
  const get = await productsService.getAll()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(422).json(err));

  return get;
}

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const getOneById = await productsService.getOne(id);
    if (getOneById.error && getOneById.error === 'PRODUCT_NOT_EXIST') {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: 'Wrong id format' } }); 
    }
    return res.status(200).json(getOneById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro 500' });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    await productsService.updateOne(id, req.body);
    const getById = await productsService.getOne(id);
    return res.status(200).json(getById);
  } catch (err) {
    return res.status(500).json({ message: 'Erro 500' });
  }
};

async function create(req, res) {
  const { body } = req;

  try {
    await productsService.create(body);
    return res.status(201).json(await procutsModel.findProduct(body.name));
  } catch (error) {
    return res.status(400).json(error);
  }
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const dele = await productsService.deleteById(id);
    if (dele.error && dele.error === 'PRODUCT_NOT_EXIST') {
      return res.status(422).json({ err: { code: 'invalid_data', 
      message: 'Wrong id format' } }); 
    }
    const getById = await productsService.getOne(id);
    return res.status(200).json(getById);
  } catch (err) {
    return res.status(500).json({ message: 'Erro 500' });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteById,
};