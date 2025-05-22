

"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { friendsAtom } from "@/social/store/friendAtom"; 
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";


interface MessagePopoverProps {
  trigger: React.ReactNode;
  onSendMessage: (receiverId: number, content: string) => Promise<boolean>; 
}

export const MessagePopover: React.FC<MessagePopoverProps> = ({
  trigger,
  onSendMessage,
}) => {
  const friends = useAtomValue(friendsAtom);
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const filteredFriends = search.length >= 3
    ? friends.filter((friend) =>
        friend.userName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={0}
        className="w-72 h-96 flex flex-col justify-between item-center max-w-md p-4 space-y-2 bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl -translate-x-8"
      >
        <Input
          placeholder="Search friends..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedId(null); 
          }}
        />

        {filteredFriends.length > 0 && (
          <div className="max-h-48 overflow-y-auto border rounded p-2 text-sm space-y-1">
            {filteredFriends.map((friend) => (
              <div
                key={friend.userId}
                onClick={() => {
                  setSelectedId(friend.userId);
                  setSearch(friend.userName); 
                }}
                className={`cursor-pointer px-2 py-1 rounded ${
                  selectedId === friend.userId
                    ? "bg-blue-500 text-white"
                    : "hover:bg-muted"
                }`}
              >
                {friend.userName}
              </div>
            ))}
          </div>
        )}



        <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="resize-none h-full"
        />


        <Button
          className="w-full flex justify-center"
          onClick={async () => {
            if (selectedId && message.trim()) {
              try {
                const success = await onSendMessage(selectedId, message.trim());
                if (success) {
                  setMessage("");
                  setSearch("");
                  setSelectedId(null);
                  setOpen(false);
                  toast({
                    title: "Message sent",
                    description: "Your message was successfully delivered.",
                  });
                } else {
                  toast({
                    title: "Failed to send",
                    description: "Something went wrong.",
                    variant: "destructive",
                  });
                }
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Could not send your message.",
                  variant: "destructive",
                });
              }
            }
          }}
          disabled={!selectedId || message.trim() === ""}
        >
          <Send className="w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
