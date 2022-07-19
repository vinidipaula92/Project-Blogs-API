const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    foreignKey: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('PostCategory', attributes, {
    tableName: 'PostCategories',
    timestamps: false,
  });
  model.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return model;
};