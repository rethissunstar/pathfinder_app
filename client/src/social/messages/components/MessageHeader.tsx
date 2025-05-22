
"use client";

import { FC } from "react";
import { RefreshCcw, Pencil } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { MessagePopover } from "./MessagePopover"; 
import { cn } from "@/lib/utils";
import { sendMessage } from "@/lib/api/messages";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";

interface MessageHeaderProps {
    onRefresh: () => void;
    onSendMessage: (receiverId: number, content: string) => Promise<boolean>;
  }
  
export const MessageHeader: FC<MessageHeaderProps> = ({ onRefresh }) => {

    const [user] = useAtom(userAtom);

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 border-b",
        "bg-white dark:bg-gray-800 text-black dark:text-white"
      )}
    >
      <h2 className="text-xl font-semibold">Messages</h2>
      <div className="flex gap-2">
        {/* 🟡 Compose Popover Button */}
        <MessagePopover
            trigger={
                <Button  variant="ghost">
                <Pencil className="w-5 h-5" />
                </Button>
            }
            onSendMessage={async (receiverId, content) => {
                try {
                 
                  if (!user?.userId) throw new Error("Missing sender");
              
                  const response = await sendMessage(user.userId, receiverId, content);
                  console.log("✅ Message sent:", { receiverId, content });
                  return true;
                } catch (err) {
                  console.error("❌ Failed to send message:", err);
                  return false;
                }
              }}
              
            />


        {/* 🔄 Refresh Button */}
        <Button
          
          variant="ghost"
          onClick={onRefresh}
          className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
