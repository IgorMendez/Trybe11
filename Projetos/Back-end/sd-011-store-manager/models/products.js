const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'products';

const getAll = async () => {
  const result = await connection()
    .then((db) => db.collection(COLLECTION).find().toArray());
  return { products: result };
};

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(COLLECTION).findOne(ObjectId(id)));
};

const findProduct = async (name) => {
  const find = await connection()
      .then((db) => db.collection(COLLECTION).findOne({ name }));
  return find;
};

const create = async (param) => {
  try {
    const insert = await connection().then((db) => db.collection(COLLECTION).insertOne(param));
    return insert;
  } catch (error) { return error; }
};

const updateOne = async (id, product) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection(COLLECTION).updateOne(
      { _id: ObjectId(id) }, { $set: { name: product.name, quantity: product.quantity } },
));
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const dele = await connection()
  .then((db) => db.collection(COLLECTION).deleteOne({ _id: ObjectId(id) }));
  return dele;
};

module.exports = {
  getAll,
  create,
  findProduct,
  getOne,
  updateOne,
  deleteById,
};