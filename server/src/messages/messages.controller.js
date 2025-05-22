

let messageService;

// CONTROLLER FUNCTIONS
const sendMessageHandler = async (req, res) => {
  try {
    const { senderId, receiverId, content, conversationId, parentMessageId } = req.body;
    const message = await messageService.sendMessage(senderId, receiverId, content, conversationId, parentMessageId);
    res.status(201).json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMessagesByConversationHandler = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await messageService.getMessagesByConversation(conversationId);
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMessagesBetweenUsersHandler = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await messageService.getMessagesBetweenUsers(senderId, receiverId);
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMessagesPreviewHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 25;
    const offset = parseInt(req.query.offset) || 0;
    const previews = await messageService.getMessagesPreviewForUser(userId, limit, offset);
    res.status(200).json(previews);
  } catch (error) {
    console.error("Error fetching message previews:", error);
    res.status(500).json({ error: error.message });
  }
};

const replyToMessageHandler = async (req, res) => {
  try {
    const { senderId, receiverId, content, parentMessageId } = req.body;
    const reply = await messageService.replyToMessage(senderId, receiverId, content, parentMessageId);
    res.status(201).json({ reply });
  } catch (error) {
    console.error('Error replying to message:', error);
    res.status(500).json({ error: error.message });
  }
};

const flagMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.flagMessage(messageId);
    res.json(result);
  } catch (error) {
    console.error('Error flagging message:', error);
    res.status(500).json({ error: error.message });
  }
};

const archiveMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.archiveMessage(messageId);
    res.json(result);
  } catch (error) {
    console.error('Error archiving message:', error);
    res.status(500).json({ error: error.message });
  }
};

const removeMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.removeMessage(messageId);
    res.json(result);
  } catch (error) {
    console.error('Error removing message:', error);
    res.status(500).json({ error: error.message });
  }
};

const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await messageService.markMessageAsRead(messageId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: error.message });
  }
};

// SERVICE INJECTION
const injectMessageService = (service) => {
  messageService = service;
};

// MODEL INJECTION (Default unless in test mode)
if (process.env.NODE_ENV !== "test") {
  const sequelize = require("../../shared/db/connection");
  const defineUserModel = require("../users/user.model");
  const defineMessageModel = require("./messages.model");
  const createMessageService = require("./messages.service");

  const User = defineUserModel(sequelize);
  const Message = defineMessageModel(sequelize, User);
  messageService = createMessageService(Message, User);
}

module.exports = {
  sendMessageHandler,
  getMessagesByConversationHandler,
  getMessagesBetweenUsersHandler,
  getMessagesPreviewHandler,
  replyToMessageHandler,
  flagMessage,
  archiveMessage,
  removeMessage,
  markMessageAsRead,
  injectMessageService,
};
