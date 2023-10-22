const { User } = require('../models');

const userData = [
    {
      username: 'john_doe',
      password: 'password123',
    },
    {
      username: 'jane_doe',
      password: 'password456',
    },
  ];
  
  const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  module.exports = seedUser;