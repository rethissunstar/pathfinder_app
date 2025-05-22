"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import { MessageHeader } from "../messages/components/MessageHeader";
import FriendList from "../components/FriendList"; 
// import { handleCompose, handleRefresh } from "../messages/utilities/messageUtil";
import { sendMessage } from "@/lib/api/messages";
import { useToast } from "@/hooks/use-toast";
import { useAtomValue, useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import MessageList from "../messages/components/MessageList";




const DesktopSocialScreen: React.FC = () => {
  const [expandedFriends, setExpandedFriends] = useState(true); 
  const [expandedParty, setExpandedParty] = useState(true); 
  const [user] = useAtom(userAtom);
  const { toast } = useToast();
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleRefresh = () => {
    setRefreshCounter((prev) => prev + 1); 
  };

  // const handleSendMessage = async (receiverId: number, content: string): Promise<boolean> => {
  //   try {
  //     // const res = await sendMessage(receiverId, content);
  //     // return res.ok;
  //     console.log("this is the sendMessage in desktop", receiverId, content);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };
  
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 min-w-full">
      {/* Left Section - Widgets */}
      <div className="w-full   p-4 space-y-4">
        <h2 className="text-lg font-bold">Widgets</h2>
        <ul>
          {/* Example widgets */}
          <li className="p-4 bg-gray-700 rounded-lg w-36">Character Creator</li>
          <li className="p-4 bg-gray-700 rounded-lg w-36">Play Character - Coming soon</li>
          <li className="p-4 bg-gray-700 rounded-lg w-36">Mapmaker?</li>
        </ul>
      </div>

      {/* Center Section - Posts or Messages */}
      <div className="w-full p-4">
        <Tabs defaultValue="posts" className="rounded">
          <TabsList className="flex justify-between mb-4 bg-red-900">
          <TabsTrigger
              value="posts"
              className=" p-2 rounded-md group w-full"
              
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className=" p-2 rounded-md group w-full"
              
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="posts"
            className="min-h-screen border rounded p-4 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-bold">Posts</h2>
            Posts Coming soon
          </TabsContent>

        

          <TabsContent
            value="messages"
            className="min-h-screen border rounded"
          >
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
              <MessageHeader  onRefresh={handleRefresh} onSendMessage={handleSendMessage} />
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen">
            <MessageList refreshSignal={refreshCounter} />
            </div>
          </TabsContent>



        </Tabs>
      </div>

      {/* Right Section - Friends and Party */}
      <div className="w-full p-4 space-y-4">
      <Accordion type="multiple" defaultValue={["friends", "party"]}>
      <AccordionItem value="friends">
        <AccordionTrigger onClick={() => setExpandedFriends(!expandedFriends)}>
          Friends
        </AccordionTrigger>
        <AccordionContent>
          <FriendList />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="party">
        <AccordionTrigger onClick={() => setExpandedParty(!expandedParty)}>
          Party
        </AccordionTrigger>
        <AccordionContent>
          Party functionality coming soon
          <div className="text-sm">Party members will be shown here.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

      </div>
    </div>
  );
};

export default DesktopSocialScreen;



