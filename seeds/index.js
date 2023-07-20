const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
//const seedGallery = require('./blogData');
//const seedPaintings = require('./paintingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  //await seedPaintings();

  process.exit(0);
};

seedAll();
