const servUs = require('../Models/users');

const uniqueEmail = async (req, res, next) => {
  const pei = await servUs.getOneByEmail(req.body.email);
  if (pei) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  next();
};

module.exports = { uniqueEmail, verifyAdmin };