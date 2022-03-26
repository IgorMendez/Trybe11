const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');

const ordersRoute = require('../database/routes/orders');
const loginRoute = require('../database/routes/login');
const registerRoute = require('../database/routes/register');
const productsRoute = require('../database/routes/products');
const imagesRouter = require('../database/routes/images');
const productsDetails = require('../database/routes/details');

app.use(express.json());
app.use(cors());
app.use('/login', loginRoute);
app.use('/orders', ordersRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.use('/images', imagesRouter);
app.use('/customer/orders/', productsDetails);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
