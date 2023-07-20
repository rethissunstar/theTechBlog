// const { Blog } = require('../models/');

// const blogdata = [
//   {
//     Title: 'The advantage of the MVC',
//     blogPost: 'This is where some stuff goes',
//     creation_date: 'April 20, 2021 07:00:00',
//     update_date: 'June 21, 2021 17:00:00',
//     owner: 'batman'
//   },
//   {
//     Title: 'javascript is great',
//     blogPost: 'This is where we say good stuff about JS',
//     creation_date: 'June 22, 2021 09:00:00',
//     update_date: 'September 22, 2021 22:00:00',
//     owner:'batman'
//   },
// ];

// const seedBlog = () => Blog.bulkCreate(blogdata);

// module.exports = seedBlog;
const { Blog } = require('../models');

const createBlog = async () => {
  const blogs = [
    {
      title: 'The advantage of the MVC',
      blog_post: 'This is where some stuff goes',
      creation_date: '2021-04-20 11:00:00',
      update_date: '2021-06-21 21:00:00',
      owner: 'batman',
      created_at: '2023-07-20 21:04:58',
      updated_at: '2023-07-20 21:04:58',
    },
    {
      title: 'javascript is great',
      blog_post: 'This is where we say good stuff about JS',
      creation_date: '2021-06-22 13:00:00',
      update_date: '2021-09-23 02:00:00',
      owner: 'batman',
      created_at: '2023-07-20 21:04:58',
      updated_at: '2023-07-20 21:04:58',
    },
  ];

  try {
    const newBlogs = await Blog.bulkCreate(blogs);
    console.log(`Blogs created: ${JSON.stringify(newBlogs)}`);
  } catch (err) {
    console.error('Error creating blogs:', err);
  }
};

module.exports = createBlog;