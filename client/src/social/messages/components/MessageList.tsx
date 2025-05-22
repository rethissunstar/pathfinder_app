

"use client";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { getMessagesPreviewForUser } from "@/lib/api/messages";
import { MessagePreview } from "@/types/message";
import MessageCard from "./MessageCard";
import MessageCardSkeleton from "./MessageCardSkeleton";
import SearchBox from "@/components/common/SearchBox";

interface MessageListProps {
  refreshSignal?: number; 
  onRefreshDone?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ refreshSignal, onRefreshDone }) => {
  const [user] = useAtom(userAtom);
  const [conversations, setConversations] = useState<MessagePreview[]>([]);
  const [filtered, setFiltered] = useState<MessagePreview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!user?.userId) return;

    setLoading(true);
    try {
      const data = await getMessagesPreviewForUser(user.userId);
      console.log("this is the data for the message list", data)
      setConversations(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
      onRefreshDone?.();
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId, refreshSignal]); // refreshSignal triggers re-fetch

  return (
    <div className="space-y-4 ">
      <SearchBox
        data={conversations}
        searchKeys={["senderName", "lastMessage"]}
        onSelect={() => {}}
        placeholder="Search messages..."
        onFilterChange={setFiltered}
      />

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <MessageCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center mt-4">
          No messages found.
        </div>
      ) : (
        filtered.map((message) => (
          <MessageCard
          key={message.conversationId ?? `${message.otherUserId}-${message.timestamp}`}
            senderName={message.otherUserName}
            senderId={message.otherUserId}
            profilePic={message.profilePic}
            lastMessage={message.lastMessage}
            timestamp={message.timestamp}
            onOpenThread={() => {
              console.log("Open thread for:", message.conversationId);
            }}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
