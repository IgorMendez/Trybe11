const express = require('express');

const router = express.Router();

const { getAllProducts, getOneProduct } = require('../controllers/products');

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);

module.exports = router;
