"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileSocialScreen = dynamic(() => import("@/social/mobile/MobileSocialLayout"));
const DesktopSocialScreen = dynamic(() => import("@/social/desktop/DesktopSocialScreen"));

export default function SocialPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Tailwind sm breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileSocialScreen /> : <DesktopSocialScreen />;

}
