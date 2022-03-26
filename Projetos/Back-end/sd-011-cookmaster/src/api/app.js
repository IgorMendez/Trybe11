const express = require('express');
const path = require('path');
require('dotenv').config();

const userRouter = require('../routers/users');
const userLogin = require('../routers/login');
const recipes = require('../routers/recipes');

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', userLogin);
app.use('/recipes', recipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliado

module.exports = app;
