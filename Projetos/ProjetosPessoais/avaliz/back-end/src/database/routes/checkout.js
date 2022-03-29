const express = require('express');

const router = express.Router();

const { createNewRequest } =  require('../controllers/checkout');

router.post('/', createNewRequest);

module.exports = router;