const validateType = (req, res, next) => {
  const [...products] = req.body;
  const msg = 'Wrong product ID or invalid quantity';
  for (let i = 0; i < products.length; i += 1) {
    if (typeof products[i].quantity !== 'number') {
      return res.status(422).json({
        err: { code: 'invalid_data',
          message: msg,
        },
      });
    }
  }
  next();
};

const validateQuanty = (req, res, next) => {
  const [...products] = req.body;
  const msg = 'Wrong product ID or invalid quantity';
  for (let i = 0; i < products.length; i += 1) {
    if (products[i].quantity <= 0) {
      return res.status(422).json({
        err: { code: 'invalid_data',
          message: msg,
        },
      });
    }
  }
  next();
};

module.exports = {
  validateType,
  validateQuanty,
};