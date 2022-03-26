const PostsCategories = (sequelize, DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER },
    categoryId: { type: DataTypes.INTEGER },
  }, {
    timestamps: false,
  });

  PostsCategorie.getAssociate = (models) => {
    PostsCategorie.belongsToMany(models.BlogPost, { as: 'categories',
    through: models.BlogPost,
    foreignKey: 'categoryId',
    otherKey: 'postId' });
    PostsCategorie.belongsToMany(models.Categories, { as: 'posts',
    through: models.Categories,
    foreignKey: 'postId',
    otherKey: 'categoryId' });
  };
  return PostsCategorie;  
};

module.exports = PostsCategories;
