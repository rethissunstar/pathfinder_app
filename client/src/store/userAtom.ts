

import { atom } from "jotai";

export type User = {
  userId: number;
  userName: string;
  email: string;
  permission: "admin" | "dm" | "player";
  theme?: "light" | "dark";
  language?: string;
  profilePic?: string;
  guild?: string;
  party?: string;
  status?: string;
};

// This atom will hold the current logged-in user
export const userAtom = atom<User | null>(null);

export const isMobileAtom = atom(false); 
