const express = require('express');

const { 
  validateName,
  validateQuantity,
  validateExists,
 } = require('../middlewares/productsValidate');

const router = express.Router();

const productsController = require('../controllers/products');

router.post('/', validateExists, validateName, validateQuantity, productsController.create);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getOne);
router.put('/:id', validateName, validateQuantity, productsController.updateOne);
router.delete('/:id', productsController.deleteById);
module.exports = router;