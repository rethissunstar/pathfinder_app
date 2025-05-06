const createFriendService = (Friend) => {
    const sendRequest = async (userId, friendId) => {
      if (userId === friendId) {
        throw new Error("Cannot add yourself as a friend");
      }
  
      return Friend.create({ userId, friendId, status: "pending" });
    };
  
    const respondToRequest = async (id, status) => {
      const request = await Friend.findByPk(id);
      if (!request) throw new Error("Friend request not found");
  
      if (!["accepted", "rejected"].includes(status)) {
        throw new Error("Invalid status");
      }
  
      request.status = status;
      await request.save();
      return request;
    };
  
    const getFriends = async (userId) => {
      return Friend.findAll({
        where: {
          userId,
          status: "accepted",
        },
      });
    };
  
    const deleteFriendship = async (id) => {
      const request = await Friend.findByPk(id);
      if (!request) throw new Error("Friendship not found");
  
      await request.destroy();
    };
  
    return {
      sendRequest,
      respondToRequest,
      getFriends,
      deleteFriendship,
    };
  };
  
  module.exports = createFriendService;
  
  