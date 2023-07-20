const { User } = require('../models');

const createUser = async () => {
  const username = 'batman';
  const num_posts = 0;
  const email = 'batman@batman.com';
  const password = 'password';

  try {
    const newUser = await User.create({ username, num_posts, email, password });
    console.log(`User with username "${username}" created: ${JSON.stringify(newUser)}`);
    return newUser; 
  } catch (err) {
    console.error(`Error creating user with username "${username}":`, err);
    throw err; 
  }
};

const seedUser = async () => {
  try {
    
    const newUser = await createUser();
    
    await User.bulkCreate([newUser]);
  } catch (err) {
    console.error('Error seeding user:', err);
  }
};

module.exports = seedUser;
