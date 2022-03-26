const { ObjectId } = require('mongodb');
const connect = require('./connection');

const RECIPES_COLLECTION = 'recipes';

const getAllRecipes = async () => connect()
.then((db) => db.collection(RECIPES_COLLECTION).find({}).toArray());

const getById = async (id) => connect()
.then((db) => db.collection(RECIPES_COLLECTION).findOne(ObjectId(id)));

const updateOne = async (data, userId, id) => {
  const update = await connect()
    .then((db) => db.collection(RECIPES_COLLECTION)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...data, userId } }, { 
        returnOriginal: false, 
      }));
  return update;
};

const insertOne = async (data) => connect()
  .then((db) => db.collection(RECIPES_COLLECTION).insertOne(data));

const deleteOne = async (id) => connect()
  .then((db) => db.collection(RECIPES_COLLECTION).deleteOne({ _id: ObjectId(id) }));

const uploadImage = async (id, image) => {
  const upload = await connect()
    .then((db) => db.collection(RECIPES_COLLECTION)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }));
  return { ...upload.value, image };
};

module.exports = {
  insertOne,
  getAllRecipes,
  getById,
  updateOne,
  deleteOne,
  uploadImage,
};