const sequelize = require('../config/connection');
//const { Blog } = require('../models');
const { User, Blog } = require('../models');
const seedBlog = require('./blogData');
const seedUser = require('./userData');
//const seedGallery = require('./blogData');
//const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBlog();

  //await seedPaintings();

  process.exit(0);
};

seedAll();
