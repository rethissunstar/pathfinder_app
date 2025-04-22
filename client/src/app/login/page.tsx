// app/login/page.tsx (Next.js App Router)

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MobileLoginScreen = dynamic(() => import("@/features/login/components/MobileLoginScreen"));
const DesktopLoginScreen = dynamic(() => import("@/features/login/components/DesktopLoginScreen"));

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Tailwind breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileLoginScreen /> : <DesktopLoginScreen />;
}
