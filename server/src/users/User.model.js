// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../shared/db/connection');

// class User extends Model {}

// User.init(
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true, 
//       unique: true,
//     },
//     userName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     permission: {
//       type: DataTypes.ENUM('admin', 'dm', 'player'),
//       defaultValue: 'player',
//     },
//     email: {
//       type: DataTypes.STRING,
//       validate: { isEmail: true },
//     },
//     dateCreated: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     theme: {
//       type: DataTypes.ENUM('light', 'dark'),
//       defaultValue: 'light',
//     },
//     language: {
//       type: DataTypes.STRING,
//       defaultValue: 'en',
//     },
//     updated: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     modelName: 'user',
//     underscored: true,
//   }
// );

// module.exports = User;

const { Model, DataTypes } = require('sequelize');

const defineUserModel = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permission: {
        type: DataTypes.ENUM('admin', 'dm', 'player'),
        defaultValue: 'player',
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      dateCreated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      theme: {
        type: DataTypes.ENUM('light', 'dark'),
        defaultValue: 'light',
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: 'en',
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'user',
      underscored: true,
    }
  );

  return User;
};

module.exports = defineUserModel;
