require('dotenv').config();
// const jwt = require('jsonwebtoken');
const { BlogPost, Categories } = require('../models');

const findAllBlogPosts = (req, res) => {
  const user = req.locals;
  return BlogPost.findOne({ where: { userId: user.id } }).then(async (data) => { 
    const { dataValues } = await Categories.findOne({ where: { id: data.dataValues.id } });
    const obj = {
      ...data.dataValues,
      user,
      categories: [dataValues],
    };
    return res.status(200).json([obj]);
  });
};

const findById = (req, res) => {
  const { params, locals } = req;
    return BlogPost.findOne({ where: { userId: Number(params.id) } }).then(async (data) => { 
      const { dataValues } = await Categories.findOne({ where: { id: data.dataValues.id } });
      const obj = {
        ...data.dataValues,
        user: locals,
        categories: [dataValues],
      };
      return res.status(200).json(obj);
    });
};

const createBlogPosts = (req, res) => {
  const { title, content } = req.body;
  return BlogPost.create({ title, content, userId: req.user })
    .then((data) => res.status(201).send(data.dataValues));
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    await BlogPost.update({ title, content }, { where: { id } });
  
    BlogPost.findOne({ where: { id } })
      .then(async (e) => {
        const { dataValues } = await Categories.findOne({ where: { id: e.dataValues.id } });
        const obj = {
          ...e.dataValues,
          // user: locals,
          categories: [dataValues],
        };
        return res.status(200).json(obj);
      }); 
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (req, res) => {
  const data = req.params;
  const { id } = data;
  await BlogPost.destroy({ where: { id } });
  return res.status(204).json();
};

module.exports = {
  createBlogPosts,
  findAllBlogPosts,
  findById,
  updateOne,
  deleteOne,
};