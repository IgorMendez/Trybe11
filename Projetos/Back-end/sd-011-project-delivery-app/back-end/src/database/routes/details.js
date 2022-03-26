const express = require('express');

const router = express.Router();
const { getProducts } = require('../controllers/details');
// const { checkUser } = require('../middlewares/auth');


router.get('/:id', getProducts)

module.exports = router;
