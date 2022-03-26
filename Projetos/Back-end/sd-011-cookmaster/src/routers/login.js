const express = require('express');

const router = express.Router();
const loginValidation = require('../middlewares/loginValidation');
const loginPass = require('../middlewares/logindValipass');

router.post('/', loginValidation.checkDataExists, loginPass.checkPass);

module.exports = router;