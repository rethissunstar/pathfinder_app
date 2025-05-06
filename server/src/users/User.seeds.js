

const bcrypt = require('bcrypt');
const sequelize = require('../../shared/db/connection');
const defineUserModel = require('./User.model'); 
const User = defineUserModel(sequelize);  

const seedUsers = async () => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

  const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
  const hashedTestPassword = await bcrypt.hash(process.env.TESTUSER_PASSWORD, saltRounds);
  const hashedRethisPassword = await bcrypt.hash(process.env.RETHIS_PASSWORD, saltRounds);
  const hashedDefaultPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD, saltRounds);

  await User.bulkCreate([
    {
      userName: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedAdminPassword,
      permission: 'admin',
    },
    {
      userName: 'rethisSunstar',
      email: process.env.RETHIS_EMAIL,
      password: hashedRethisPassword, 
      permission: 'admin',
    },
    {
      userName: 'testUser',
      email: process.env.TESTUSER_EMAIL,
      password: hashedTestPassword,
      permission: 'player',
    },
    {
      userName: 'copperChris',
      email: process.env.TESTUSER_EMAIL,
      password: hashedDefaultPassword,
      permission: 'player',
    },
    {
      userName: 'xaosBreaker',
      email: process.env.TESTUSER_EMAIL,
      password: hashedDefaultPassword,
      permission: 'player',
    },
    {
      userName: 'cosmicShrimp',
      email: process.env.TESTUSER_EMAIL,
      password: hashedDefaultPassword,
      permission: 'player',
    },
    {
      userName: 'chefGreg',
      email: process.env.TESTUSER_EMAIL,
      password: hashedDefaultPassword,
      permission: 'player',
    },


  ]);
};

module.exports = seedUsers;
