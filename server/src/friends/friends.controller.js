

let friendService;

const sendFriendRequest = async (req, res) => {
  try {
    const { requestorId, friendUserId } = req.body;

    const newRequest = await friendService.sendRequest(requestorId, friendUserId);
    res.status(201).json({ message: "Friend request sent", request: newRequest });
  } catch (err) {
    console.error("Send request error:", err);
    res.status(400).json({ error: err.message });
  }
};

const respondToFriendRequest = async (req, res) => {
  try {
    const { requestorId, friendUserId, status } = req.body;

    const updatedRequest = await friendService.respondToRequest(requestorId, friendUserId, status);
    res.json({ message: `Friend request ${status}`, request: updatedRequest });
  } catch (err) {
    console.error("Respond error:", err);
    res.status(400).json({ error: err.message });
  }
};

const getIncomingRequests = async (req, res) => {
  const { userId } = req.params; 
  const requests = await friendService.getIncomingRequests(userId);
  res.json(requests);
};

const getOutgoingRequests = async (req, res) => {
  const { userId } = req.params;  
  const requests = await friendService.getOutgoingRequests(userId);
  res.json(requests);
};

const listFriends = async (req, res) => {
  try {
    const { userId } = req.params;  
    const friends = await friendService.getFriends(userId);
    res.json(friends);
  } catch (err) {
    console.error("List friends error:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { id } = req.params;  
    await friendService.deleteFriendship(id);
    res.json({ message: "Friend removed successfully" });
  } catch (err) {
    console.error("Delete friend error:", err);
    res.status(500).json({ error: err.message });
  }
};

const injectFriendService = (service) => {
  friendService = service;
};

if (process.env.NODE_ENV !== "test") {
  const defineFriendModel = require('./friends.model');
  const createFriendService = require('./friends.service');
  const defineUserModel = require('../users/user.model');
  const sequelize = require('../../shared/db/connection');

  const Friend = defineFriendModel(sequelize);
  const User = defineUserModel(sequelize);

  friendService = createFriendService(Friend, User);
}

module.exports = {
  sendFriendRequest,
  respondToFriendRequest,
  listFriends,
  deleteFriend,
  injectFriendService,
  getIncomingRequests,
  getOutgoingRequests
};
