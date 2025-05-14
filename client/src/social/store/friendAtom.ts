import { atom } from "jotai";
import { Friend } from "../../types/friend";

export const friendsAtom = atom<Friend[]>([]);
