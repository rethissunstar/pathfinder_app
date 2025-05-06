const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Friend extends Model {}

  Friend.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  }, {
    sequelize,
    modelName: 'friend',       
    tableName: 'friends',       
    underscored: true,         
    timestamps: false,         
  });

  return Friend;
};
