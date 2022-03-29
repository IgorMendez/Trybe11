const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const api = require('../database/routes/api');
const structures = require('../database/routes/structures');
const checkoutRoute = require('../database/routes/checkout')

app.use(express.json());
app.use(cors());
app.use('/', express.static(__dirname + '/build'));
app.use('/api', api)
app.use('/structures', structures)
app.use('/checkout', checkoutRoute)


app.get('/avaliacao-online', (req, res) => {
  return res.sendFile(__dirname + '/build/index.html');
});

app.get('/avaliacao-cautelar', (req, res) => {
  return res.sendFile(__dirname + '/build/index.html');
});


module.exports = app;