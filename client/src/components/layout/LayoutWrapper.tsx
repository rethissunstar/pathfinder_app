"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom, isMobileAtom } from "@/store/userAtom";
import { retrieveUserData } from "@/lib/api/retrieveUserData";
import UserPopover from "../common/ui/popover/UserPopover";
import SettingsSheet from "../common/ui/Sheet";
import EditAvatarSheet from "../common/ui/sheet/EditAvatarSheet";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useAtom(userAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editAvatarOpen, setEditAvatarOpen] = useState(false); 

  useEffect(() => {
    const checkMobileAndTheme = () => {
      setIsMobile(window.innerWidth < 768);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      setUser((prev) => {
        if (prev && !prev.theme) {
          return {
            ...prev,
            theme: prefersDark ? "dark" : "light",
          };
        }
        return prev;
      });
    };

    checkMobileAndTheme();
    window.addEventListener("resize", checkMobileAndTheme);
    return () => window.removeEventListener("resize", checkMobileAndTheme);
  }, [setIsMobile, setUser]);

  useEffect(() => {
    const loggedIn = document.cookie.includes("loggedIn=true");
    if (!loggedIn && pathname !== "/login") {
      router.replace("/login");
    } else if (loggedIn) {
      retrieveUserData()
        .then((user) => {
          if (user) setUser(user);
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [pathname, setUser, router]);

  const handleLogout = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    router.push("/login");
  };

  return (
    <div className={user?.theme === "dark" ? "dark" : ""}>
      <header className="w-full bg-red-800 p-4 shadow-md flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="https://legacy.aonprd.com/include/PRD-Logo.png"
            alt="Pathfinder Logo"
            className="h-10 object-contain"
          />
          <span className="text-white text-xl font-bold hidden sm:inline">Home</span>
        </Link>

        {user && pathname !== "/login" && (
          <>
            <UserPopover
              userName={user.userName}
              guild={user.guild}
              party={user.party}
              status={user.status}
              theme={user.theme}
              onLogout={handleLogout}
              onSettingsClick={() => setSettingsOpen(true)}
              onEditAvatarClick={() => setEditAvatarOpen(true)} 
            />
            <SettingsSheet open={settingsOpen} onClose={setSettingsOpen} isMobile={isMobile} />
            <EditAvatarSheet open={editAvatarOpen} onClose={setEditAvatarOpen} isMobile={isMobile} />
          </>
        )}
      </header>

      <main className="p-4 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}



// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { useAtom } from "jotai";
// import { userAtom } from "@/store/userAtom";
// import { isMobileAtom } from "@/store/userAtom";
// import { retrieveUserData } from "@/lib/api/retrieveUserData";
// import UserPopover from "../common/ui/popover/UserPopover";
// import SettingsSheet from "../common/ui/Sheet";

// export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [user, setUser] = useAtom(userAtom);
//   const [isMobile, setIsMobile] = useAtom(isMobileAtom);
//   const [settingsOpen, setSettingsOpen] = useState(false);

//   useEffect(() => {
//     const checkMobileAndTheme = () => {
//       setIsMobile(window.innerWidth < 768);

//       const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//       setUser((prev) => {
//         if (prev && !prev.theme) {
//           return {
//             ...prev,
//             theme: prefersDark ? "dark" : "light",
//           };
//         }

//         return prev;
//       });
//     };

//     checkMobileAndTheme();
//     window.addEventListener("resize", checkMobileAndTheme);
//     return () => window.removeEventListener("resize", checkMobileAndTheme);
//   }, [setIsMobile, setUser]);

//   useEffect(() => {
//     const loggedIn = document.cookie.includes("loggedIn=true");
//     if (!loggedIn && pathname !== "/login") {
//       router.replace("/login");
//     } else if (loggedIn) {
//       retrieveUserData()
//         .then((user) => {
//           if (user) {
//             setUser(user);
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to fetch user:", err);
//         });
//     }
//   }, [pathname, setUser, router]);

//   const handleLogout = () => {
//     document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <div className={user?.theme === "dark" ? "dark" : ""}>
//       <header className="w-full bg-red-800 p-4 shadow-md flex items-center justify-between">
//         <Link href="/" className="flex items-center space-x-3">
//           <img
//             src="https://legacy.aonprd.com/include/PRD-Logo.png"
//             alt="Pathfinder Logo"
//             className="h-10 object-contain"
//           />
//           <span className="text-white text-xl font-bold hidden sm:inline">Home</span>
//         </Link>

//         {user && pathname !== "/login" && (
//           <>
//       <UserPopover
//         userName={user.userName}
//         guild={user.guild}
//         party={user.party}
//         status={user.status}
//         theme={user.theme}
//         onLogout={handleLogout}
//         onSettingsClick={() => setSettingsOpen(true)}
//         />

//             <SettingsSheet open={settingsOpen} onClose={setSettingsOpen} isMobile={isMobile} />
//           </>
//         )}
//       </header>

//       <main className="p-4 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
//         {children}
//       </main>
//     </div>
//   );
// }
