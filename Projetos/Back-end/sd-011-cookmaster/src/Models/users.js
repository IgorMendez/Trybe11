const connect = require('./connection');

const USER_COLLECTION = 'users'; 

const createUserModel = async (dataUser) => {
  const oi = await connect().then((db) => db.collection(USER_COLLECTION).insertOne(dataUser));
  return oi;
};

const createAdmin = async (dataAdmin) => {
  const oi = await connect().then((db) => db.collection(USER_COLLECTION).insertOne(dataAdmin));
  return oi;
};

const getOneByEmail = async (email) => connect()
  .then((db) => db.collection(USER_COLLECTION).findOne({ email }));

module.exports = {
  createUserModel,
  getOneByEmail,
  createAdmin,
};
