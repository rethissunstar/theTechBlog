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
    title: {
      type: DataTypes.STRING, 
      defaultValue: 'Default Title', 
    },
    blog_post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
      allowNull: false,
    },
    update_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;