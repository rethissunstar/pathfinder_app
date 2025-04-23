

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";
import { retrieveUserData } from "@/lib/api/retrieveUserData";
import UserPopover from "../common/ui/popover/UserPopover";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom); 

  useEffect(() => {
    const loggedIn = document.cookie.includes("loggedIn=true");
    if (!loggedIn && pathname !== "/login") {
      router.replace("/login");
    } else if (loggedIn) {
      retrieveUserData()
        .then((user) => {
          if (user) {
            setUser(user);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [pathname, setUser, router]);

  const handleLogout = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <header className="w-full bg-red-800 p-4 shadow-md flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="https://legacy.aonprd.com/include/PRD-Logo.png"
            alt="Pathfinder Logo"
            className="h-10 object-contain"
          />
          <span className="text-white text-xl font-bold hidden sm:inline">Home</span>
        </Link>

        {/* ✅ Use UserPopover if logged in */}
        {user && pathname !== "/login" && (
          <UserPopover
            userName={user.userName}
            guild={user.guild}
            party={user.party}
            status={user.status}
            onLogout={handleLogout}
          />
        )}
      </header>

      <main className="p-4 min-h-screen">{children}</main>
    </>
  );
}
