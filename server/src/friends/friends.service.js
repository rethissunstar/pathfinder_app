const { Op } = require("sequelize");

const createFriendService = (Friend, User) => {
  // Send a friend request from one user to another
  const sendRequest = async (requestorId, friendUserId) => {
    if (requestorId === friendUserId) {
      throw new Error("Cannot add yourself as a friend");
    }

    // Check if a friend request already exists in either direction
    const existing = await Friend.findOne({
      where: {
        [Op.or]: [
          { requestorId, friendUserId },  // Check if requestorId and friendUserId match
          { requestorId: friendUserId, friendUserId: requestorId }  // Reverse relationship
        ]
      }
    });

    if (existing) {
      throw new Error("Friend request already exists");
    }

    // Create a new pending friend request
    return Friend.create({ requestorId, friendUserId, status: "pending" });
  };

  // Respond to a pending friend request (accept or reject)
  const respondToRequest = async (requestorId, friendUserId, status) => {
    console.log('Responding to friend request with userId:', requestorId, 'friendId:', friendUserId); // Log the userId and friendId
  
    const request = await Friend.findOne({
      where: {
        requestorId: requestorId,  
        friendUserId: friendUserId  
      }
    });
  
    if (!request) throw new Error("Friend request not found");
  
    // Update the status of the friend request
    request.status = status;
    await request.save();
    return request;
  };
  


const getFriends = async (userId) => {
    console.log('Fetching friends for user:', userId);
  
 
    const requestorFriends = await Friend.findAll({
      where: {
        status: "accepted",
        requestorId: userId,  
      },
      include: [
        {
          model: User,
          as: "friendUser",  
          attributes: ["userId", "userName", "profilePic", "guild", "party", "status"],
          required: true,
        },
      ],
    });
  
    console.log("Requestor friends:", requestorFriends);
  
 
    const friendUserFriends = await Friend.findAll({
      where: {
        status: "accepted",
        friendUserId: userId,  
      },
      include: [
        {
          model: User,
          as: "requestingUser",  
          attributes: ["userId", "userName", "profilePic", "guild", "party", "status"],
          required: true,
        },
      ],
    });
  
    console.log("FriendUser friends:", friendUserFriends);
  
    // Combine the results
    const friendList = [
      ...requestorFriends.map((friend) => friend.friendUser),
      ...friendUserFriends.map((friend) => friend.requestingUser),
    ];
  
    console.log('Friend list:', friendList);
  
    return friendList;
  };
  
  
  // Delete a friendship (by id)
  const deleteFriendship = async (id) => {
    const request = await Friend.findByPk(id);
    if (!request) throw new Error("Friendship not found");
    await request.destroy(); 
  };

  // Get incoming friend requests for a user
  const getIncomingRequests = async (userId) => {
    return Friend.findAll({
      where: {
        friendUserId: userId,
        status: "pending",
      },
      include: [
        {
          model: User,
          as: "requestingUser",
          attributes: ["userId", "userName", "profilePic", "guild", "party", "status"],
        },
      ],
    });
  };

  // Get outgoing friend requests for a user
  const getOutgoingRequests = async (userId) => {
    return Friend.findAll({
      where: {
        requestorId: userId,
        status: "pending",
      },
      include: [
        {
          model: User,
          as: "friendUser",
          attributes: ["userId", "userName", "profilePic", "guild", "party", "status"],
        },
      ],
    });
  };

  return {
    getIncomingRequests,
    getOutgoingRequests,
    sendRequest,
    respondToRequest,
    getFriends,
    deleteFriendship,
  };
};

module.exports = createFriendService;

 