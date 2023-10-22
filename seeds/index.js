const sequelize = require('../config/connection');
const userSeedData = require('./userSeedData'); 
const postSeedData = require('./postSeedData');  
const commentSeedData = require('./commentSeedData');  

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeedData();

  await postSeedData();

  await commentSeedData();

  process.exit(0);
};

seedDatabase();