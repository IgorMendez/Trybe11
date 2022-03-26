const express = require('express');

const router = express.Router();

const { setAllowAccessControl } = require('../middlewares/auth');

const { getAllSales,  createSale, getOneSale, updateStatus } = require('../controllers/orders');

router.get('/', getAllSales);
router.get('/:id', getOneSale);
router.post('/', createSale);
router.patch('/:id', updateStatus);

module.exports = router;