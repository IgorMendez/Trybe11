const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'trybe',
  password: '916293Fund@o',
  host: '127.0.0.1',
  database: 'model_example'
});

module.exports = connection;