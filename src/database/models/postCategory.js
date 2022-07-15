const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'BlogPosts',
      key: 'id',
    },
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
    primaryKey: true,
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('PostCategory', attributes, {
    tableName: 'PostCategories',
    timestamps: false,
  });
  model.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: 'PostCategory',
      foreignKey: 'postId',
      as: 'post',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: 'PostCategory',
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };
  return model;
};