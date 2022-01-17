const connection = require('./connection');

const getByAuthorId = async (author_id) => {
  const titles = await connection.execute(
    'SELECT title FROM books WHERE author_id=?', [author_id]
  );

  if (titles.length === 0) return null;

  const titleAuthorId = `titlesOfAuthorId${author_id}`;
  
  return {
    [titleAuthorId]: titles[0]
  }
}

const getAll = async () => {
  const [books] = await connection.execute('SELECT author_id, title FROM books');

  return books;
}


module.exports = {
  getAll,
  getByAuthorId,
}