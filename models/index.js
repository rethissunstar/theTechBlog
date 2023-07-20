const User = require('./User');
const Blog = require('./Blogs');
//const Painting = require('./Painting');


// User.hasMany(Blog, {
//   foreignKey: 'blog_id',
// });

// Blog.belongsTo(User, {
//   foreignKey: 'user_id',
// });

module.exports = { User, Blog};
