"use client";

import React from "react";
import { Avatar } from "@/components/common/ui/Avatar";
import { formatDistanceToNow } from "date-fns";

interface MessageCardProps {
  senderName: string;
  senderId: number;
  profilePic?: string;
  lastMessage: string;
  timestamp?: string;
  onOpenThread: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  senderName,
  profilePic,
  lastMessage,
  timestamp,
  onOpenThread,
}) => {
  const relativeTime = timestamp
    ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    : "";

  return (
    <div
      onClick={onOpenThread}
      className="flex items-start gap-4 p-4 min-h-[5.5rem] border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800 mb-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar src={profilePic} alt={senderName} size="md" />
      </div>

      {/* Text content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold">{senderName}</span>
          {relativeTime && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {relativeTime}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;

