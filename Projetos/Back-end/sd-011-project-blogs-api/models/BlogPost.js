const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    // https://github.com/tryber/sd-011-project-blogs-api/pull/149/files mais uma do mestre
    published: { type: DataTypes.DATE, defaultValue: sequelize.fn('NOW') },
    updated: { type: DataTypes.DATE, defaultValue: sequelize.fn('NOW') },
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};

module.exports = BlogPosts;
