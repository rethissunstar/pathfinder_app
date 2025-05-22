"use client"

import React, { useEffect, useState } from "react";
import { getFriends, getIncomingRequests, getOutgoingRequests } from "@/lib/api/friends";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { friendsAtom } from "../store/friendAtom";
import { Friend } from "@/types/friend";
import FriendCard from "./FriendCard"; 
import { respondToFriendRequest } from "@/lib/api/friends";
import SearchBox from "@/components/common/SearchBox";
import FriendRequestSheet from "./FriendSheet"; 
import { Plus } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { deleteFriend } from "@/lib/api/friends";

// Main component for friend management
const FriendList: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [friends, setFriends] = useAtom(friendsAtom);
  const [filtered, setFiltered] = useState<Friend[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [incoming, setIncoming] = useState<Friend[]>([]);
  const [outgoing, setOutgoing] = useState<Friend[]>([]);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchRequests = async () => {
      try {
        const [incomingData, outgoingData] = await Promise.all([
          getIncomingRequests(user.userId),
          getOutgoingRequests(user.userId)
        ]);
        setIncoming(incomingData as Friend[]);
        setOutgoing(outgoingData as Friend[]);
      } catch (error) {
        console.error("Failed to fetch friend requests:", error);
      }
    };

    fetchRequests();
  }, [user?.userId]);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchFriends = async () => {
      try {
        const data = await getFriends(user.userId);
        console.log("this is the friend data", data);
        setFriends(data as Friend[]);
        setFiltered(data as Friend[]);
      } catch (error) {
        console.error("Failed to load friends:", error);
      }
    };

    fetchFriends();
  }, [user?.userId]);

  const handleAcceptRequest = async (userId: number, friendId: number) => {
    console.log("this is the userId and friendId", userId);
    console.log("this is friendID", friendId);
    try {
      // Send friend request acceptance
      await respondToFriendRequest(userId, friendId, true);
      console.log(`✅ Friend request from user ${userId} accepted.`);

      // Optionally re-fetch friends and incoming requests
      const updatedFriends = await getFriends(userId);
      const updatedIncoming = await getIncomingRequests(userId);
      setFriends(updatedFriends);
      setIncoming(updatedIncoming);
    } catch (err) {
      console.error("❌ Error accepting friend request:", err);
    }
  };

  const handleRejectRequest = async (userId: number, friendId: number) => {
    try {
      await respondToFriendRequest(userId, friendId, false);
      console.log(`❌ Rejected request from user ${userId}`);

      // Refresh incoming requests only
      const updatedIncoming = await getIncomingRequests(userId);
      setIncoming(updatedIncoming);
    } catch (err) {
      console.error("Failed to reject friend request:", err);
    }
  };

  const handleRemoveFriend = async (requestorId: number, friendUserId: number) => {
    try {
        console.log("the remove worked", requestorId, friendUserId)
      await deleteFriend(requestorId, friendUserId); 
      console.log(`✅ Friend between ${requestorId} and ${friendUserId} removed.`);
      
      // Optionally refresh the list of friends after removal
      const updatedFriends = await getFriends(user?.userId!);  
      setFriends(updatedFriends);
    } catch (error) {
      console.error("❌ Failed to remove friend:", error);
    }
  };
  

  return (
    <div className="space-y-3 p-4 relative">
        <FriendRequestSheet
            open={sheetOpen}
            onClose={setSheetOpen}
            isMobile      
            friends={friends}
            incoming={incoming}
            outgoing={outgoing}
            setFriends={setFriends}
        />
          <div className="flex justify-between gap-2">
       <SearchBox
        data={friends}
        searchKeys={["friendUser.userName", "friendUser.guild", "friendUser.party", "status"]}
        onSelect={() => {}}
        placeholder="Search friends..."
        onFilterChange={setFiltered}
        />

        <Button
          variant="default"
          onClick={() => setSheetOpen(true)}
          className="bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition h-11"
          aria-label="Add Friend"
        >
          <Plus size={12} />
        </Button>
      </div>
   
      {incoming.map((req) => (
        <FriendCard
            key={`incoming-${req.userId}`}
            username={req.requestingUser?.userName || "Unknown"}
            status={req.status}
            profilePic={req.requestingUser?.profilePic}
            isIncomingRequest
          
            onAccept={() => {
                console.log('is there really the req here?', req)
            if (req.requestorId && req.friendUserId) {
                handleAcceptRequest(req.requestorId, req.friendUserId); 
            } else {
                console.error("Missing userId or friendUserId");
            }
            }}
            onReject={() => {
            if (user?.userId && req.friendUserId) {
                handleRejectRequest(user.userId, req.friendUserId); 
            } else {
                console.error("Missing userId or friendUserId");
            }
            }}
        />
        ))}


      {/* Outgoing Requests */}
      {outgoing.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-yellow-600">Outgoing Requests</h3>
          <div className="space-y-2">
            {outgoing.map(req => (
              <FriendCard
                key={`outgoing-${req.friendUserId}`}
                username={req.friendUser?.userName || "Unknown"}
                status="Requested"
                profilePic={req.friendUser?.profilePic}
              />
            ))}
          </div>
        </div>
      )}

      {/* Friends */}
{friends.length > 0 && (
  <div>
    <h3 className="text-sm font-semibold text-green-600">Friends</h3>
    <div className="space-y-2">
      {filtered.map(friend => {
        console.log("Friend object:", friend);

        return (
          <FriendCard
            key={friend.userId}
            username={friend.userName || "Unknown"}
            guild={friend.guild || "No Guild"}
            party={friend.party || "No Party"}
            status="Friend"
            profilePic={friend.profilePic}
            friendUserId={friend.friendUserId} 
            requestorId={friend.requestorId}   
            onRemove={() => {
                console.log("this is the friend data on the onRemove", friend)
                console.log("this is the user", user)
                if (user && friend.userId) {
                  handleRemoveFriend(user.userId, friend.userId);
                } else {
                  console.error("Missing user or friendUserId");
                }
              }}
              
              
          />
        );
      })}
    </div>
  </div>
)}


    </div>
  );
};

export default FriendList;
