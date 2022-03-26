const checkDataExists = (req, res, next) => {
  const { body } = req;
  const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const checkEmail = emailPattern.test(body.email);
  if (!body.email || !body.password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!checkEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  checkDataExists,
};