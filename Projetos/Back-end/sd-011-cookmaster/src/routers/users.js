const express = require('express');

const {
  userValid,
} = require('../middlewares/userValidation');

const { uniqueEmail, verifyAdmin } = require('../middlewares/uniqueEmail');
const { validateToken } = require('../auth/validateToken');

const router = express.Router();

const { createUserController, createAdmin } = require('../Controllers/users');

router.post('/', userValid, uniqueEmail, createUserController);
router.post('/admin', validateToken, verifyAdmin, createAdmin);

module.exports = router;