const express = require('express');
const app = express();
const port = 3000;

const author = require('./models/Author');

app.get('/authors', async (req, res) => {
  const authors = await author.getAll();

  res.status(200).json(authors);
});

app.listen(port, () => console.log('To ouvindo'))