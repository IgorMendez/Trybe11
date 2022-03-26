const express = require('express');

const router = express.Router();

const { generateToken } = require('../middlewares/auth');

const { userLogin, getSellers } = require('../controllers/login');

router.post('/', generateToken, userLogin);
router.get('/', getSellers)


module.exports = router;