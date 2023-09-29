const { User } = require('../models');

const userData = [
    {
      name: 'john_doe',
      password: 'password123',
    },
    {
      name: 'jane_doe',
      password: 'password456',
    },
  ];
  
  const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  module.exports = seedUser;