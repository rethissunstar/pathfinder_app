"use client";

import React from "react";

const MessageCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-gray-100 dark:bg-gray-800 animate-pulse mb-3">
      {/* Avatar placeholder */}
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Text placeholders */}
      <div className="flex-1 px-4 space-y-2">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
    </div>
  );
};

export default MessageCardSkeleton;
