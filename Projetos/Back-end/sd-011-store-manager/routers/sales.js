const { Router } = require('express');

const {
  validateType, validateQuanty,
} = require('../middlewares/salesValidate');

const router = Router();

const salesControllers = require('../controllers/sales');

router.post('/', validateType, validateQuanty, salesControllers.productSolded);
router.get('/', salesControllers.getAllSales);
router.get('/:id', salesControllers.getById);
router.put('/:id', validateType, validateQuanty, salesControllers.salesUpdate);
router.delete('/:id', salesControllers.deleteSale);
module.exports = router;