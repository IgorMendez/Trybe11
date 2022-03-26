'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      // https://github.com/tryber/sd-011-project-blogs-api/pull/149/files Tive que consultar o mestre, pois estava preso =/
      hooks: {
        beforeCreate: (newBlogPost, _options) => {
          newBlogPost.published = new Date();
          newBlogPost.updated = new Date();
        },
        beforeUpdate: (updatedBlogPost, _options) => {
          updatedBlogPost.updated = new Date();
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  },
};
