const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, Categories, BlogPost } = require('../models');

const checkDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long', 
    });
  }
  next();
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  // encontrei a muito tempo na internet e trago de projeto em projeto, acabei perdendo o link de referência.
  const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const emailIsValid = emailPattern.test(email);
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!emailIsValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  return User.findAll({ where: { email } }).then((e) => {
    if (e.length > 0) {
      return res.status(409).json({ message: 'User already registered' });
    }
  next();
  });
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const checkLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  
  next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  const decodeToken = jwt.decode(token, process.env.JWT_SECRET);
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (!decodeToken) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  const { email, password } = decodeToken;
  return User.findOne({ where: { email, password } })
    .then(({ dataValues }) => { 
      req.locals = dataValues;
      next();
    });
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const checkBlogPost = (req, res, next) => {
  const { title, categoryIds, content } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const checkCategoryIds = (req, res, next) => {
  const token = req.headers.authorization;
  const { email, password } = jwt.decode(token, process.env.JWT_SECRET);
  User.findOne({ where: { email, password } })
    .then(({ dataValues: { id } }) => { req.user = id; });
  const { categoryIds } = req.body;
  return categoryIds.map((e) => Categories.findOne({ where: { id: e } })
  .then((result) => {
    if (!result) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
  }));
};

const checkPosts = (req, res, next) => {
  const { id } = req.params;

  return BlogPost.findOne({ where: { id } })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
      }
      next();
    });
};

const checkPostToUpdate = (req, res, next) => {
  const { content, title, categoryIds } = req.body;
  // const { id } = req.params;

  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { email, password } = jwt.decode(token, process.env.JWT_SECRET);

  return User.findOne({ where: { email, password } })
    .then(({ dataValues }) => BlogPost.findOne({ where: { id } })
      .then((el) => {
        if (el.dataValues.userId !== dataValues.id) {
          return res.status(401).json({ message: 'Unauthorized user' });
        }
        next();
      })); 
};            

module.exports = {
  checkDisplayName,
  checkEmail,
  checkPassword,
  checkLogin,
  checkToken,
  checkName,
  checkBlogPost,
  checkCategoryIds,
  checkPosts,
  checkPostToUpdate,
  checkAuth,
};