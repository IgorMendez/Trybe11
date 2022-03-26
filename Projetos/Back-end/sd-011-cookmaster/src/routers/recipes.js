const express = require('express');

const router = express.Router();

const recipesCreate = require('../Controllers/recipes');
const { checkRecipe } = require('../middlewares/recipesValidation');
const { validateToken } = require('../auth/validateToken');
const util = require('../middlewares/util');

router.get('/', recipesCreate.getAllRecipes);
router.get('/:id', recipesCreate.getById);
router.post('/', validateToken, checkRecipe, recipesCreate.insertOne);
router.put('/:id', validateToken, recipesCreate.updateOne);
router.delete('/:id', validateToken, recipesCreate.deleteOne);
router.put('/:id/image', util.upload.single('image'), validateToken, recipesCreate.uploadImage);
router.get('/images/:id', recipesCreate.imageRender);

module.exports = router;