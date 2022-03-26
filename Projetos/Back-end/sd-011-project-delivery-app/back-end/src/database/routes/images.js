const express = require('express');

const router = express.Router();

const { getImage } = require('../controllers/products');

router.get('/:url', getImage);


module.exports = router;