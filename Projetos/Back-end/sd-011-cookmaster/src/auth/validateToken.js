const jwt = require('jsonwebtoken');
const { getOneByEmail } = require('../Models/users');

const segredo = 'segredo';
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await getOneByEmail(decoded.email);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const validateAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await getOneByEmail(decoded.email);
    if (user.role === 'admin') {
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  validateToken,
  validateAdmin,
};