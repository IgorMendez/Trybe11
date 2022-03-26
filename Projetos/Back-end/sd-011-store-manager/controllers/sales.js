const salesServices = require('../services/sales');

const num = 200;

const productSolded = async (req, res) => {
  try {
    const [...products] = req.body;
    const { result } = await salesServices.productSolded(products);
    return res.status(num).json(result);
  } catch (err) {
    // a
  }
};

const getAllSales = async (_req, res) => {
  try {
    const { get } = await salesServices.getAllSales();
    console.log('getall', get);
    return res.status(num).json({ sales: get });
  } catch (err) {
    return res.status(500).json({ err: 'erro 500' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message, data } = await salesServices.getById(id);
  
    if (!data) {
      return res.status(404).json({
        err: {
          code,
          message,
        },
      });
    }
  
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ err: 'erro 500' });
  }
};

const salesUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const [...products] = req.body;
  
    const { code, message, data } = await salesServices.salesUpdate(id, products);
  
    if (!data) {
      return res.status(422).json({
        err: {
          code,
          message,
        },
      });
    }
  
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro 500' });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const deletSale = await salesServices.deleteSale(id);
    if (deletSale.erro === 'NOT_FOUND') {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      });
    }
    return res.status(200).json(deletSale);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro 500' });
  }
};

module.exports = {
  productSolded,
  getAllSales,
  getById,
  salesUpdate,
  deleteSale,
};