const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const author = require('./models/Author');
const book = require('./models/Books');

app.use(bodyParser.json());

app.get('/authors', async (req, res) => {
  const authors = await author.getAll();

  res.status(200).json(authors);
});

app.get('/books', async (req, res) => {
  const books = await book.getAll();

  res.status(200).json(books);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const books = await book.getByAuthorId(id);

  if (!books) res.status(404).json({message: 'Nenhum titulo encontrato'});
  res.status(200).json(books);
});

app.post('/authors', async(req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  if (!author.isValid(first_name, middle_name, last_name)) return res.status(400).json({ message: 'Dados inválidos' });

  await author.create(first_name, middle_name, last_name);

  res.status(201).json({ message: 'Autor criado com sucesso! '});
})

const PORT = process.env.PORT || 3000;

app.listen(port, () => console.log('To ouvindo'))