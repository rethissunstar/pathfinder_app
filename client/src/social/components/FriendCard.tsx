"use client";

import React from "react";
import { Button } from "@/components/common/ui/Button";
import { MoreVertical } from "lucide-react";
import { Avatar } from "@/components/common/ui/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FriendCardProps {
    username: string;
    guild?: string;
    party?: string;
    status?: string;
    profilePic?: string;
    onAccept?: () => void;
    onReject?: () => void;   
    isIncomingRequest?: boolean;
  }
  

const FriendCard: React.FC<FriendCardProps> = ({
    username,
    guild,
    party,
    status,
    profilePic,
    onAccept,
    onReject,
    isIncomingRequest, 
  }) => {
  

   console.log("this is the profilePic being received", profilePic)
  return (

<div className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-gray-100 dark:bg-gray-800 mb-3">
  {/* Section 1: Avatar */}
  <div className="flex-shrink-0">
    <Avatar src={profilePic} alt={username} size="md" />
  </div>

  {/* Section 2: Text content */}
  <div className="flex-1 px-4">
    <div className="font-semibold">{username}</div>
    <div className="text-xs text-gray-500">
      {guild || "No Guild"} | {party || "No Party"}
    </div>
    <div className="text-xs text-gray-400">
      Status: {status || "Offline"}
    </div>
  </div>

  {/* Section 3: Actions */}
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className="w-8 h-8 p-0">
        <MoreVertical />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" className="w-20 space-y-2">
    {isIncomingRequest && status === "pending" && (
  <>
    <Button variant="secondary" className="w-full text-sm" onClick={onAccept}>
      Accept
    </Button>
    <Button variant="danger" className="w-full text-sm" onClick={onReject}>
      Reject
    </Button>
  </>
)}

{status === "Friend" && (
  <Button variant="secondary" className="w-full text-sm">
    Message
  </Button>
)}
{status === "Friend" && (
    <Button variant="secondary" className="w-full text-sm">Invite to Party</Button>
)}
      
      <Button variant="danger" className="w-full text-sm">Remove</Button>
    </PopoverContent>
  </Popover>
</div>


  );
};

export default FriendCard;

