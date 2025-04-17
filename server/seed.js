// server/seed.js
const sequelize = require('./shared/db/connection');
const defineUserModel = require('./src/users/User.model');
const seedUsers = require('./src/users/User.seeds');

const runSeeds = async () => {
  try {
    defineUserModel(sequelize); 
    await sequelize.sync({ force: true }); 
    await seedUsers();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

runSeeds();
