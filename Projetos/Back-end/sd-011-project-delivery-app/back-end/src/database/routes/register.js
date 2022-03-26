const express = require('express');

const router = express.Router();
const { postUser } = require('../controllers/register')
const { checkUser } = require('../middlewares/auth');

router.post('/', checkUser, postUser)

module.exports = router;
