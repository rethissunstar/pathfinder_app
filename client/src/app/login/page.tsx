

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { isMobileAtom } from "@/store/screenAtom"; 

// Dynamically load login screens
const MobileLoginScreen = dynamic(() => import("@/features/login/components/MobileLoginScreen"));
const DesktopLoginScreen = dynamic(() => import("@/features/login/components/DesktopLoginScreen"));

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);
  const setGlobalIsMobile = useSetAtom(isMobileAtom);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width < 768; 
      setIsMobile(mobile);
      setGlobalIsMobile(mobile);
    };

    checkMobile(); 
    window.addEventListener("resize", checkMobile); 

    return () => window.removeEventListener("resize", checkMobile);
  }, [setGlobalIsMobile]);

  return isMobile ? <MobileLoginScreen /> : <DesktopLoginScreen />;
}
