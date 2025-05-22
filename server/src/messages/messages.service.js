const { Op } = require("sequelize");

const createMessageService = (Message, User) => {
  const sendMessage = async (senderId, receiverId, content, conversationId = null, parentMessageId = null) => {
    return await Message.create({
      senderId,
      receiverId,
      content,
      conversationId,
      parentMessageId,
    });
  };

  const getMessagesByConversation = async (conversationId) => {
    return await Message.findAll({
      where: { conversationId },
      include: [
        { model: User, as: "sender", attributes: ["userId", "userName", "profilePic"] },
        { model: User, as: "receiver", attributes: ["userId", "userName", "profilePic"] }
      ],
      order: [["dateSent", "ASC"]],
    });
  };

  const getMessagesBetweenUsers = async (senderId, receiverId) => {
    return await Message.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: [
        { model: User, as: "sender", attributes: ["userId", "userName", "profilePic"] },
        { model: User, as: "receiver", attributes: ["userId", "userName", "profilePic"] }
      ],
      order: [["dateSent", "ASC"]],
    });
  };




  const getMessagesPreviewForUser = async (userId, limit = 25, offset = 0) => {
    const previews = await Message.findAll({
      attributes: [
        "messageId",
        "conversationId",
        "content",
        "dateSent"
      ],
      where: {
        [Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      include: [
        { model: User, as: "sender", attributes: ["userId", "userName", "profilePic"] },
        { model: User, as: "receiver", attributes: ["userId", "userName", "profilePic"] }
      ],
      order: [["date_sent", "DESC"]],
      limit,
      offset,
    });
  
    const seenConversations = new Set();
    const uniqueConversations = [];
  
    for (const message of previews) {
      console.log("→ message keys:", Object.keys(message));
      const conversationId = message.conversation_id;
  
      if (!seenConversations.has(conversationId)) {
        seenConversations.add(conversationId);
  
        const isSender = message.sender?.userId === Number(userId);
        const friendUser = isSender ? message.receiver : message.sender;
  
        if (!friendUser) {
          console.warn("Missing friendUser for message:", message.message_id);
          continue;
        }
  
        uniqueConversations.push({
          conversationId,
          otherUserId: friendUser.userId,
          otherUserName: friendUser.userName,
          profilePic: friendUser.profilePic,
          lastMessage: message.content,
          timestamp: message.dateSent,
        });
      }
    }
  
    return uniqueConversations;
  };
  
  
  const replyToMessage = async (senderId, receiverId, content, parentMessageId) => {
    const originalMessage = await Message.findByPk(parentMessageId);
    const conversationId = originalMessage.conversationId || null;
    return sendMessage(senderId, receiverId, content, conversationId, parentMessageId);
  };

  const markMessageAsRead = async (messageId) => {
    const result = await Message.update(
      { status: "read" },
      { where: { messageId } }
    );

    if (result[0] === 0) {
      throw new Error("Message not found");
    }

    return { message: "Message marked as read" };
  };

  const archiveMessage = async (messageId) => {
    const message = await Message.findByPk(messageId);
    if (!message) throw new Error("Message not found");
    message.status = "archived";
    await message.save();
    return { message: "Message archived" };
  };

  const flagMessage = async (messageId) => {
    const message = await Message.findByPk(messageId);
    if (!message) throw new Error("Message not found");
    message.status = "flagged";
    await message.save();
    return { message: "Message flagged for moderation" };
  };

  const removeMessage = async (messageId) => {
    const message = await Message.findByPk(messageId);
    if (!message) throw new Error("Message not found");
    message.status = "deleted";
    await message.save();
    return { message: "Message marked as deleted" };
  };

  return {
    sendMessage,
    getMessagesByConversation,
    getMessagesBetweenUsers,
    getMessagesPreviewForUser,
    replyToMessage,
    markMessageAsRead,
    archiveMessage,
    flagMessage,
    removeMessage,
  };
};

module.exports = createMessageService;
