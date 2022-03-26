const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((connect) => {
        db = connect.db(DB_NAME);
        return db;
      }));

module.exports = connection;