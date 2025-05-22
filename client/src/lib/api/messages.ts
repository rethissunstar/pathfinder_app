import { MessagePreview } from "@/types/message";


// 🟡 Get messages between two users
export const getMessagesBetweenUsers = async (senderId: number, receiverId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(
      `http://localhost:3001/api/messages/between/${senderId}/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch messages:", errorText);
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // 🟡 Get messages by conversationId
  export const getMessagesByConversation = async (conversationId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(
      `http://localhost:3001/api/messages/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch messages by conversation:", errorText);
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // 🟡 Send a new message
  export const sendMessage = async (
    senderId: number,
    receiverId: number,
    content: string,
    conversationId?: number,
    parentMessageId?: number
  ) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch("http://localhost:3001/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId,
        receiverId,
        content,
        conversationId,
        parentMessageId,
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send message:", errorText);
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // 🟠 Reply to a message (in the same conversation)
  export const replyToMessage = async (
    senderId: number,
    receiverId: number,
    content: string,
    parentMessageId: number
  ) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch("http://localhost:3001/api/messages/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId,
        receiverId,
        content,
        parentMessageId,
      }),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to reply to message:", errorText);
      throw new Error(`Failed to reply to message: ${response.statusText}`);
    }
  
    return response.json();
  };
  


// Flag a message
export const flagMessage = async (messageId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(`http://localhost:3001/api/messages/flag/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to flag message:", errorText);
      throw new Error(`Failed to flag message: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // Archive a message
  export const archiveMessage = async (messageId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(`http://localhost:3001/api/messages/archive/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to archive message:", errorText);
      throw new Error(`Failed to archive message: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // Soft delete a message
  export const removeMessage = async (messageId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(`http://localhost:3001/api/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to delete message:", errorText);
      throw new Error(`Failed to delete message: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  export const markMessageAsRead = async (messageId: number) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized: No token found");
  
    const response = await fetch(`http://localhost:3001/api/messages/read/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to mark message as read:", errorText);
      throw new Error(`Failed to mark message as read: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  export const getMessagesPreviewForUser = async (
    userId: number,
    limit: number = 25,
    offset: number = 0
  ): Promise<MessagePreview[]> => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  
    if (!token) throw new Error("Unauthorized");
  
    const response = await fetch(
      `http://localhost:3001/api/messages/preview/${userId}?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch message previews: ${errorText}`);
    }
  
    return await response.json();
  };
  