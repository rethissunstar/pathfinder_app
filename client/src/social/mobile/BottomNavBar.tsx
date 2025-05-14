

"use client";

import React from "react";
import {
  Home,
  HomeIcon,
  Users,
  UsersRound,
  Grid,
  LayoutGrid
} from "lucide-react";
import { Sword, Shield } from "phosphor-react";

type Section = "posts" | "friends" | "widgets" | "party";

interface BottomNavBarProps {
  current: Section;
  onNavigate: (section: Section) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ current, onNavigate }) => {
    const buttons = [
        {
          icons: [
            (active: boolean) => (
              <HomeIcon size={28} color={active ? "#f87171" : "#9ca3af"} />
            ),
            null
          ],
          label: "Posts",
          value: "posts"
        },
        {
          icons: [
            (active: boolean) => (
              <UsersRound size={28} color={active ? "#f87171" : "#9ca3af"} />
            ),
            null
          ],
          label: "Friends",
          value: "friends"
        },
        {
          icons: [
            (active: boolean) => (
              <LayoutGrid
                size={28}
                strokeWidth={3}
                color={active ? "#f87171" : "#9ca3af"}
              />
            ),
            null
          ],
          label: "Widgets",
          value: "widgets"
        },
        {
          icons: [
            (active: boolean) => (
              <Sword
                size={36}
                weight={active ? "fill" : "regular"}
                color={active ? "#f87171" : "#9ca3af"}
              />
            ),
            (active: boolean) => (
              <Shield
                size={20}
                weight={active ? "fill" : "regular"}
                color={active ? "#f87171" : "#9ca3af"}
              />
            )
          ],
          label: "Party",
          value: "party"
        }
      ];
      

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-between py-3 border-t border-gray-700 min-h-[90px] p-4">
      {buttons.map((btn) => {
        const isActive = current === btn.value;

        return (
          <button
            key={btn.value}
            onClick={() => onNavigate(btn.value as Section)}
            className={`flex flex-col items-center justify-center min-h-[80px] transition-all duration-200 ${
              isActive
                ? "text-red-400 shadow-xl"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {/* ICON STACK */}
            <div className="relative flex justify-center items-center">
              <div className={isActive ? "text-red-400" : "text-gray-400"}>
                {btn.icons[0] && btn.icons[0](isActive)}
              </div>
              {btn.icons[1] && (
  <div
    className={`absolute bottom-0 right-0 opacity-80 ${
      isActive ? "text-red-400" : "text-gray-400"
    }`}
  >
    {btn.icons[1](isActive)}
  </div>
)}

            </div>
            <span className="text-xs mt-1">{btn.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;

