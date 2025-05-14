

// // 🟢 GET all friends for the current user
// export async function getFriends(userId: number) {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];
  
//     if (!token) throw new Error("Unauthorized: No token found");
  
//     //this address has to be changed on the live
//     const response = await fetch(`http://localhost:3001/api/friends/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to fetch friends:", errorText);
//       throw new Error(`Failed to fetch friends: ${response.statusText}`);
//     }
  
//     return response.json();
//   }

//   export const getIncomingRequests = async (userId: number) => {
//     const response = await fetch(`http://localhost:3001/api/friends/requests/incoming/${userId}`);
//     return response.json();
//   };
  
//   export const getOutgoingRequests = async (userId: number) => {

//     const response = await fetch(`http://localhost:3001/api/friends/requests/outgoing/${userId}`);
//     console.log("this is the response", response)
//     return response.json();
//   };
  
  
//   // 🟡 POST send a new friend request
//   export async function sendFriendRequest(userId: number, friendUserId: number) {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];
  
//     if (!token) throw new Error("Unauthorized: No token found");
  
//     //this address has to be changed on the live
//     const response = await fetch(`http://localhost:3001/api/friends`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         userId,
//         friendUserId,
//       }),
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to send friend request:", errorText);
//       throw new Error(`Failed to send friend request: ${response.statusText}`);
//     }
  
//     return response.json();
//   }

//   export async function acceptFriendRequest(userId: number, friendId: number) {
//     return respondToFriendRequest(userId, friendId, true);
//   }
  
//   export async function rejectFriendRequest(userId: number, friendId: number) {
//     return respondToFriendRequest(userId, friendId, false);
//   }
  
  
// //   // 🟠 PATCH accept or reject a friend request
// //   export async function respondToFriendRequest(friendRequestId: number, accept: boolean) {
// //     const token = document.cookie
// //       .split("; ")
// //       .find((row) => row.startsWith("token="))
// //       ?.split("=")[1];
  
// //     if (!token) throw new Error("Unauthorized: No token found");
  
// //     //this address has to be changed on the live
// //     const response = await fetch(`http://localhost:3001/api/friends/${friendRequestId}`, {
// //       method: "PATCH",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({
// //         accept,
// //       }),
// //     });
  
// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       console.error("Failed to respond to friend request:", errorText);
// //       throw new Error(`Failed to respond to friend request: ${response.statusText}`);
// //     }
  
// //     return response.json();
// //   }
  
// // ✅ New: PATCH based on composite keys
// export async function respondToFriendRequest(
//     userId: number,
//     friendId: number,
//     accept: boolean
//   ) {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];
  
//     if (!token) throw new Error("Unauthorized: No token found");
  
//     const response = await fetch(`http://localhost:3001/api/friends/respond`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         userId,
//         friendId,
//         status: accept ? "accepted" : "rejected",
//       }),
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to respond to friend request:", errorText);
//       throw new Error(`Failed to respond to friend request: ${response.statusText}`);
//     }
  
//     return response.json();
//   }
  

//   // 🔴 DELETE remove a friend
//   export async function deleteFriend(friendRequestId: number) {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];
  
//     if (!token) throw new Error("Unauthorized: No token found");
  
//     //this address has to be changed on the live
//     const response = await fetch(`http://localhost:3001/api/friends/${friendRequestId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to delete friend:", errorText);
//       throw new Error(`Failed to delete friend: ${response.statusText}`);
//     }
  
//     return response.json();
//   }
  
// 🟢 GET all friends for the current user
export async function getFriends(userId: number) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    // this address has to be changed on the live
    const response = await fetch(`http://localhost:3001/api/friends/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch friends:", errorText);
      throw new Error(`Failed to fetch friends: ${response.statusText}`);
    }
  
    return response.json();
}

// 🟡 Get incoming friend requests for a user
export const getIncomingRequests = async (userId: number) => {
    const response = await fetch(`http://localhost:3001/api/friends/requests/incoming/${userId}`);
    return response.json();
};

// 🟡 Get outgoing friend requests for a user
export const getOutgoingRequests = async (userId: number) => {
    const response = await fetch(`http://localhost:3001/api/friends/requests/outgoing/${userId}`);
    console.log("this is the response", response);
    return response.json();
};

// 🟡 POST send a new friend request
export async function sendFriendRequest(requestorId: number, friendUserId: number) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    // this address has to be changed on the live
    const response = await fetch(`http://localhost:3001/api/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requestorId,
        friendUserId,
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send friend request:", errorText);
      throw new Error(`Failed to send friend request: ${response.statusText}`);
    }
  
    return response.json();
}

// 🟠 PATCH accept or reject a friend request
export async function respondToFriendRequest(
    requestorId: number,
    friendUserId: number,
    accept: boolean
  ) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

      console.log("requestor", requestorId)
      console.log("friendUserId", friendUserId)
      console.log("accept?", accept)
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(`http://localhost:3001/api/friends/respond`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requestorId,
        friendUserId,
        status: accept ? "accepted" : "rejected",
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to respond to friend request:", errorText);
      throw new Error(`Failed to respond to friend request: ${response.statusText}`);
    }
  
    return response.json();
}

// 🔴 DELETE remove a friend
export async function deleteFriend(friendRequestId: number) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    // this address has to be changed on the live
    const response = await fetch(`http://localhost:3001/api/friends/${friendRequestId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to delete friend:", errorText);
      throw new Error(`Failed to delete friend: ${response.statusText}`);
    }
  
    return response.json();
}
