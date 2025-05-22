// Message preview for list view
export interface MessagePreview {
    conversationId: number;
    senderId: number;
    senderName: string;
    profilePic?: string;
    lastMessage: string;
    timestamp: string; // ISO or formatted string
    otherUserName: string;
    otherUserId: number;
  }
  
  // Full message structure for a thread
  export interface Message {
    messageId: number;
    conversationId: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
    isRead: boolean;
    parentMessageId?: number;
  }
  