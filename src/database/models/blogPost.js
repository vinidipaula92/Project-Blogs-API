const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('BlogPost', attributes, {
    tableName: 'BlogPosts',
    createdAt: 'published',
    updatedAt: 'updated',
  });
  model.associate = (models) => {
    model.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return model;
};