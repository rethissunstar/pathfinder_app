

const express = require('express');
const router = express.Router();
const {
  sendMessageHandler,
  getMessagesByConversationHandler,
  getMessagesBetweenUsersHandler,
  replyToMessageHandler,
  flagMessage,
  archiveMessage,
  removeMessage,
  markMessageAsRead,
  getMessagesPreviewHandler,
} = require('./messages.controller');

// Send a new message
router.post('/send', sendMessageHandler);

// Get messages by conversation ID
router.get('/conversation/:conversationId', getMessagesByConversationHandler);

// Get messages between two users
router.get('/between/:senderId/:receiverId', getMessagesBetweenUsersHandler);

// Get messages to enable the preview. 
router.get('/preview/:userId', getMessagesPreviewHandler);

// Reply to a message
router.post('/reply', replyToMessageHandler);

// Flag a message for moderation
router.post('/flag/:messageId', flagMessage);

// Archive a message
router.post('/archive/:messageId', archiveMessage);

// Soft delete a message (mark it as deleted)
router.delete('/:messageId', removeMessage);

// Mark a message as read
router.post('/read/:messageId', markMessageAsRead);


module.exports = router;
