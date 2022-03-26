const express = require('express');

const router = express.Router();

const { createCategory, findAllCategories } = require('../controllers/categories');

const { checkToken, checkName } = require('../middleware/checkInfoUser');

router.get('/', checkToken, findAllCategories);
router.post('/', checkToken, checkName, createCategory);

module.exports = router;