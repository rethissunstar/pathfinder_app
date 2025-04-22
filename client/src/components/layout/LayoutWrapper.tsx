// "use client";

// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";

// export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const loggedIn = document.cookie.includes("loggedIn=true");
//     if (!loggedIn && pathname !== "/login") {
//       router.replace("/login");
//     }
//   }, [pathname]);

//   return (
//     <>
//       <header className="w-full bg-red-800 p-4 shadow-md flex items-center justify-between">
//         <Link href="/" className="flex items-center space-x-3">
//           <img
//             src="https://legacy.aonprd.com/include/PRD-Logo.png"
//             alt="Pathfinder Logo"
//             className="h-10 object-contain"
//           />
//           <span className="text-white text-xl font-bold hidden sm:inline">Home</span>
//         </Link>
//       </header>

//       <main className="p-4">{children}</main>
//     </>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/common/ui/Button";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = document.cookie.includes("loggedIn=true");
    if (!loggedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

        {/* ✅ Logout button using your custom Button */}
        {pathname !== "/login" && (
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="text-sm"
          >
            Logout
          </Button>
        )}
      </header>

      <main className="p-4 min-h-screen">{children}</main>
    </>
  );
}
