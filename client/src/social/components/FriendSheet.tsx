"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { X } from "lucide-react";
import { sendFriendRequest } from "@/lib/api/friends";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { getUserByUsername } from "@/lib/api/user";
import { tryToSendFriendRequest } from "@/social/utils/friendUtils";
import { Friend } from "@/types/friend";
import { useToast } from "@/hooks/use-toast";



interface User {
    userId: number;
    userName: string;
    profilePic?: string;
    guild?: string;
    party?: string;
    
  }
  

interface FriendRequestSheetProps {
    open: boolean;
    onClose: (open: boolean) => void;
    isMobile?: boolean;  
    friends?: Friend[];
    incoming?: Friend[];
    outgoing?: Friend[];
    setFriends?: (friends: Friend[]) => void;
  }
  

  const FriendRequestSheet: React.FC<FriendRequestSheetProps> = ({
    open,
    onClose,
    isMobile = false,
    friends = [],
    incoming = [],
    outgoing = [],
    setFriends,
  }) => {
  const [friendName, setFriendName] = useState("");
  const [user, ] = useAtom(userAtom);
  const { toast } = useToast();


const handleSendRequest = () => {
    if (!user) return;
  
  
    tryToSendFriendRequest(
        friendName,
        { userId: user.userId, userName: user.userName },
        [...friends, ...incoming, ...outgoing],
        () => {
          console.log("✅ Friend request sent!");
          setFriendName("");
          onClose(false);
        },
        (msg) => {
          toast({
            title: "Error",
            description: msg,
            variant: "destructive", 
          });
        }
      );
  };
  

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side={isMobile ? "top" : "right"}
        className="p-4 max-w-md mx-auto"
      >
        <SheetHeader className="bg-red-800 text-white p-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-white">Add a Friend</SheetTitle>
              <SheetDescription className="text-gray-100">
                Enter the username of the player you wish to add.
              </SheetDescription>
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-white hover:text-gray-200 transition text-2xl"
              aria-label="Close Friend Request Sheet"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4 text-gray-900 dark:text-gray-100">
          <Input
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            placeholder="Friend username"
            className="w-full p-2 rounded border border-gray-300 bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700"
/>
          <Button
            onClick={handleSendRequest}
            disabled={!friendName.trim()}
            className="w-full"
          >
            Send Request
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FriendRequestSheet;
