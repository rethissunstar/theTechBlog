const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogPost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
