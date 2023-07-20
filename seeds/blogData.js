const { Blog } = require('../models');

const blogdata = [
  {
    Title: 'The advantage of the MVC',
    blogPost: 'This is where some stuff goes',
    creation_date: 'April 20, 2021 07:00:00',
    update_date: 'June 21, 2021 17:00:00',
  },
  {
    Title: 'javascript is great',
    blogPost: 'This is where we say good stuff about JS',
    creation_date_date: 'June 22, 2021 09:00:00',
    update_date: 'September 22, 2021 22:00:00',
  },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;
