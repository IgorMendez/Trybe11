const express = require('express');

const router = express.Router();

const { checkLogin } = require('../middleware/checkInfoUser');

const { loginValidation } = require('../controllers/login');

router.post('/', checkLogin, loginValidation);

module.exports = router;