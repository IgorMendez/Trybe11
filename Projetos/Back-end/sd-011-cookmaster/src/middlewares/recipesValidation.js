const checkRecipe = (req, res, next) => {
  const { body } = req;
  if (!body.ingredients || !body.preparation || !body.name) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  checkRecipe,
};