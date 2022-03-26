const userValid = (req, res, next) => {
  const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const checkEmail = emailPattern.test(req.body.email); 
  const { body } = req;
  if (!checkEmail || !body.name || !body.password || !body.email) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  userValid,
};