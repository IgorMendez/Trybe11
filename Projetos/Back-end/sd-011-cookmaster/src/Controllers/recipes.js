const jwt = require('jsonwebtoken');
const { getOneByEmail } = require('../Models/users');
const recipesService = require('../Service/recipes');

const getAllRecipes = async (_req, res) => {
  try {
    const getAll = await recipesService.getAllRecipes();
    return res.status(200).json(getAll);
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const getId = await recipesService.getById(id);
    return res.status(200).json(getId);
  } catch (error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;
    const update = await recipesService
      .updateOne({ name, ingredients, preparation }, userId.toString(), id);
    // console.log(update);
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
};

const insertOne = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userDb = jwt.verify(token, 'segredo');
    const { _id: userId } = await getOneByEmail(userDb.email);

    const { name, ingredients, preparation } = req.body;
    const insert = await recipesService.insertOne({ name, ingredients, preparation, userId });
    return res.status(201).json(insert);
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;

    const recipe = await recipesService.uploadImage(id, filename);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesService.deleteOne(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: 'error 50' });
  }
};

const imageRender = async (req, res) => {
  const { id } = req.params;
  const url = `./uploads/${id}`;
  return res.status(200).send(url);
};

module.exports = {
  insertOne,
  getAllRecipes,
  getById,
  updateOne,
  deleteOne,
  uploadImage,
  imageRender,
};