const express = require('express');

const router = express.Router();

const { 
  checkDisplayName, 
  checkEmail, 
  checkPassword, 
  checkToken } = require('../middleware/checkInfoUser');

const { findAllUsers, findById, createUserController, deleteUser } = require('../controllers/user');

router.get('/', checkToken, findAllUsers);
router.get('/:id', checkToken, findById);
router.post('/', checkDisplayName, checkEmail, checkPassword, createUserController);
router.delete('/me', checkToken, deleteUser);

module.exports = router;