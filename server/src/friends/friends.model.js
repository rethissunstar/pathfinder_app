
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  const User = require("../users/user.model")(sequelize);

  class Friend extends Model {}

  Friend.init({
    friendId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    requestorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'requestor_id', // field in the table
    },
    friendUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'friend_user_id', // field in the table
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Friend',
    tableName: 'friends',
    underscored: true, 
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['requestor_id', 'friend_user_id'],  // Composite unique constraint
      }
    ]
  });

  // Associations (corrected and aligned with the `friendUserId` and `requestorId` field names)
  Friend.belongsTo(User, {
    foreignKey: 'requestorId',
    as: 'requestingUser',  // Alias for the user who sent the request
  });

  Friend.belongsTo(User, {
    foreignKey: 'friendUserId',
    as: 'friendUser',  // Alias for the user who received the request
  });

  return Friend;
};
