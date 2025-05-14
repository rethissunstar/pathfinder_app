export interface Friend {
    userId: number;
    friendId: number;
    status: "pending" | "accepted" | "rejected";
    userName: string;
    profilePic?: string;
    guild?: string;
    party?: string;
  
    // This field is the ID for the friend
    friendUserId?: number;  // This is the actual ID of the friend
    requestorId?: number;
  
    // These are optional nested objects depending on the context
    friendUser?: {
      userId: number;
      userName: string;
      profilePic?: string;
      guild?: string;
      party?: string;
      status?: string;
    };
  
    requestingUser?: {
      userId: number;
      userName: string;
      profilePic?: string;
      guild?: string;
      party?: string;
      status?: string;
    };
  }
  