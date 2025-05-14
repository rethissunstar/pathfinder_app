"use client";

import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import FriendList from "../components/FriendList";

type Section = "posts" | "friends" | "widgets" | "party";

const MobileSocialLayout: React.FC = () => {
  const [section, setSection] = useState<Section>("posts");

  return (
    <div className="pb-48">
      <div className="p-4">
        <h1 className="text-2xl font-bold capitalize">{section}</h1>
        {/* Render content based on section */}
        {section === "posts" && <div>Posts Content</div>}
        {section === "friends" && <FriendList />}
        {section === "widgets" && <div>Widgets Content</div>}
        {section === "party" && <div>Party Content</div>}
      </div>
      <BottomNavBar current={section} onNavigate={setSection} />
    </div>
  );
};

export default MobileSocialLayout;

