

const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  const User = require("../users/user.model")(sequelize);

  class Message extends Model {}

  Message.init(
    {
      messageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "message_id",
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sender_id",
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "receiver_id",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateSent: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "date_sent",
      },
      status: {
        type: DataTypes.ENUM("unread", "read", "archived"),
        defaultValue: "unread",
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "conversation_id",
      },
      parentMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "parent_message_id",
      },
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  // Associations to User model
  Message.belongsTo(User, {
    foreignKey: "senderId",
    as: "sender",
  });

  Message.belongsTo(User, {
    foreignKey: "receiverId",
    as: "receiver",
  });

  return Message;
};
