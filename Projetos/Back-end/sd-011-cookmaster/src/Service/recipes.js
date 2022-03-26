const recipesModels = require('../Models/recipes');

const getAllRecipes = async () => {
  const getAll = await recipesModels.getAllRecipes();
  return getAll;
};

const getById = async (id) => {
  const getByI = await recipesModels.getById(id);
  return getByI;
};

const updateOne = async (data, userId, id) => {
  const update = await recipesModels.updateOne(data, userId, id);
  return update.value;
};

const insertOne = async (data) => {
  const insert = await recipesModels.insertOne(data);
  const result = insert.ops[0];
  const { name, ingredients, preparation, userId, _id } = result;
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: userId.toString(),
      _id: _id.toString(),
    },
  };
};

const uploadImage = async (id, filename) => {
  const image = `localhost:3000/src/uploads/${filename}`;
  const result = await recipesModels.uploadImage(id, image);
  return result;
};

const deleteOne = async (id) => {
  const del = await recipesModels.deleteOne(id);
  return del;
};

module.exports = {
  insertOne,
  getAllRecipes,
  getById,
  updateOne,
  deleteOne,
  uploadImage,
};