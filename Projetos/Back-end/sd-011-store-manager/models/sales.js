const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION = 'sales';

const productSolded = async (itensSold) => {
  const solded = await connection().then((db) => db.collection(COLLECTION)
    .insertOne({ itensSold }));

  const result = { 
    _id: solded.insertedId, 
    itensSold,
  };
  return { result };
};

const getAllSales = async () => connection().then((db) => db.collection(COLLECTION)
  .find({}).toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const getBy = await connection().then((db) => db.collection(COLLECTION)
    .findOne({ _id: ObjectId(id) }));
  return getBy;
};

const salesUpdate = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) }, 
      {
        $set: {
          itensSold,
        },
      },
    );

  return result;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const delSale = await connection().then((db) => db.collection(COLLECTION).findOneAndDelete(
    { _id: ObjectId(id) }, { returnDocument: 'before' },
  ));
  return delSale.value;
};

const validateProductId = async (id) => {
  const checkId = await connection()
    .then((db) => db.collection('products').find({ _id: { $in: [id] } }).toArray());
  return checkId;
};

module.exports = {
  productSolded,
  getAllSales,
  getById,
  salesUpdate,
  deleteSale,
  validateProductId,
};