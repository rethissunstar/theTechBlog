const User = require('./User');
const Blog = require('./Blogs');
//const Painting = require('./Painting');


// User.hasMany(Blog, {
//   foreignKey: 'username',
//   as: 'blogs',
// });

// Blog.belongsTo(User, {
//   foreignKey: 'username',
//   as: 'user',
// });

// User.hasMany(Blog, { foreignKey: 'user_id', as: 'blogs' });
// Blog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { User, Blog};
