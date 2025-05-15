const express = require('express');
const router = express.Router();
const friendController = require('./friends.controller');

// POST /api/friends → Send friend request
router.post('/', friendController.sendFriendRequest);

// PATCH /api/friends/:id → Accept/reject friend request
router.patch('/:id', friendController.respondToFriendRequest);

// GET /api/friends/:userId → List accepted friends
router.get('/:userId', friendController.listFriends);

// DELETE /api/friends/:id → Remove a friend
router.delete("/:requestorId/:friendUserId", friendController.deleteFriend);

// POPULATE LIST of requests
router.get("/requests/incoming/:userId", friendController.getIncomingRequests);
router.get("/requests/outgoing/:userId", friendController.getOutgoingRequests);

module.exports = router;
