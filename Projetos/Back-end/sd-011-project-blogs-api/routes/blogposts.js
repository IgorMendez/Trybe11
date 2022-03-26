const express = require('express');

const router = express.Router();

const { createBlogPosts, 
  findAllBlogPosts, 
  findById, 
  updateOne,
  deleteOne } = require('../controllers/blogposts');

const { 
  checkToken, 
  checkBlogPost, 
  checkCategoryIds, 
  checkPosts,
  checkPostToUpdate,
  checkAuth } = require('../middleware/checkInfoUser');

router.get('/:id', checkToken, checkPosts, findById);
router.get('/', checkToken, findAllBlogPosts);
router.put('/:id', checkToken, checkAuth, checkPostToUpdate, updateOne);
router.post('/', checkToken, checkBlogPost, checkCategoryIds, createBlogPosts);
router.delete('/:id', checkToken, checkPosts, checkAuth, deleteOne);

module.exports = router;