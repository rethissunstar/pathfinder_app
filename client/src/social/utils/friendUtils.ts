// import { respondToFriendRequest } from "@/lib/api/friends";

// /**
//  * Accepts a pending friend request.
//  * @param userId - The user who originally sent the friend request.
//  * @param friendId - The recipient of the friend request (current user).
//  */
// export const acceptFriendRequest = async (userId: number, friendId: number) => {
//     try {
//       const res = await respondToFriendRequest(userId, friendId, true);
//       console.log("✅ Friend request accepted:", res);
//       return res;
//     } catch (err) {
//       console.error("❌ Failed to accept request:", err);
//       throw err;
//     }
//   };
  
// /**
//  * Rejects a pending friend request.
//  */
// export const rejectFriendRequest = async (userId: number, friendId: number) => {
//   try {
//     const id = `${userId}-${friendId}`;
//     const res = await respondToFriendRequest(userId, friendId, false);
//     console.log("❌ Friend request rejected:", res);
//     return res;
//   } catch (err) {
//     console.error("❌ Failed to reject request:", err);
//     throw err;
//   }
// };

import { sendFriendRequest, respondToFriendRequest } from "@/lib/api/friends";
import { getUserByUsername } from "@/lib/api/user";
import { Friend } from "@/types/friend";

/**
 * Accepts a pending friend request.
 * @param userId - The user who originally sent the friend request.
 * @param friendId - The recipient of the friend request (current user).
 */
export const acceptFriendRequest = async (userId: number, friendId: number) => {
  try {
    const res = await respondToFriendRequest(userId, friendId, true);
    console.log("✅ Friend request accepted:", res);
    return res;
  } catch (err) {
    console.error("❌ Failed to accept request:", err);
    throw err;
  }
};

/**
 * Rejects a pending friend request.
 */
export const rejectFriendRequest = async (userId: number, friendId: number) => {
  try {
    const res = await respondToFriendRequest(userId, friendId, false);
    console.log("❌ Friend request rejected:", res);
    return res;
  } catch (err) {
    console.error("❌ Failed to reject request:", err);
    throw err;
  }
};

/**
 * Checks if a friend request or friendship already exists between two users.
 * @param userId - The current user's ID.
 * @param friendId - The target user's ID.
 * @param allRelations - An array of all known relations: confirmed, incoming, and outgoing.
 */
export const isDuplicateFriendRelation = (
  userId: number,
  friendId: number,
  allRelations: Friend[]
): boolean => {
  return allRelations.some((f) =>
    (f.userId === userId && f.friendId === friendId) ||
    (f.userId === friendId && f.friendId === userId)
  );
};


/**
 * Attempts to send a friend request, with validation.
 */
export const tryToSendFriendRequest = async (
  friendName: string,
  currentUser: { userId: number; userName: string },
  allRelations: Friend[],
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  if (!friendName.trim()) return onError("Friend name cannot be empty.");

  if (friendName === currentUser.userName) {
    return onError("You cannot add yourself as a friend.");
  }

  try {
    const target = await getUserByUsername(friendName.trim());
    const friendId = target.userId;

    const alreadyExists = allRelations.some(f =>
      (f.userId === currentUser.userId && f.friendId === friendId) ||
      (f.userId === friendId && f.friendId === currentUser.userId)
    );

    if (alreadyExists) {
      return onError("You already have a relationship or pending request with this user.");
    }

    await sendFriendRequest(currentUser.userId, friendId);
    onSuccess();
  } catch (err) {
    console.error("❌ Failed to send request:", err);
    onError("User not found or request failed.");
  }
};
