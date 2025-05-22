


"use client";

import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import FriendList from "../components/FriendList";
import { MessageHeader } from "../messages/components/MessageHeader";
import { sendMessage } from "@/lib/api/messages";
import MessageList from "../messages/components/MessageList"; 
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { useToast } from "@/hooks/use-toast";

type Section = "posts" | "friends" | "widgets" | "party" | "messages";

const MobileSocialLayout: React.FC = () => {
  const [section, setSection] = useState<Section>("posts");
  const [user] = useAtom(userAtom);
  const { toast } = useToast();
  


  const handleSendMessage = async (
    receiverId: number,
    content: string
  ): Promise<boolean> => {
    try {
      if (!user?.userId) throw new Error("User not found");
  
      const response = await sendMessage(user.userId, receiverId, content);
      toast({
        title: "Message sent",
        description: "Your message was successfully delivered.",
      });
      return true;
    } catch (err) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <div className="pb-48">
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{section}</h1>

        {section === "posts" && <div>Posts Content</div>}
        {section === "friends" && <FriendList />}
        {section === "widgets" && <div>Widgets Content</div>}
        {section === "party" && <div>Party Content</div>}

        {section === "messages" && (
          <div className="space-y-4">
            <MessageHeader
              onRefresh={() => {
                console.log("Refresh clicked");
                // TODO: add refresh logic later
              }}
              onSendMessage={handleSendMessage}
            />
            <MessageList />
          </div>
        )}
      </div>

      <BottomNavBar current={section} onNavigate={setSection} />
    </div>
  );
};

export default MobileSocialLayout;
