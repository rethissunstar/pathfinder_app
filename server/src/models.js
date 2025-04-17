const defineUserModel = require('./users/User.model');

// Add more models here in the future
const initializeModels = (sequelize) => {
  defineUserModel(sequelize);
};

module.exports = initializeModels;
