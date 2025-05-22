

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { isMobileAtom } from "@/store/screenAtom";
import { Loader2 } from "lucide-react";

const MobileSocialScreen = dynamic(() => import("@/social/mobile/MobileSocialLayout"));
const DesktopSocialScreen = dynamic(() => import("@/social/desktop/DesktopSocialScreen"));

export default function SocialPage() {
  const isMobileFromAtom = useAtomValue(isMobileAtom);
  const setIsMobile = useSetAtom(isMobileAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (isMobileFromAtom === null) {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    }
    setHydrated(true);
  }, [isMobileFromAtom, setIsMobile]);

  const isMobile = isMobileFromAtom ?? (typeof window !== "undefined" ? window.innerWidth < 768 : false);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-900">
        <Loader2 className="animate-spin h-10 w-10 text-red-700" />
      </div>
    );
  }

  return isMobile ? <MobileSocialScreen /> : <DesktopSocialScreen />;
}
