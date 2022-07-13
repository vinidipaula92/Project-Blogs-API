'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostCategories.init({
    postId: DataTypes.NUMBER,
    categoryId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'PostCategories',
  });
  return PostCategories;
};