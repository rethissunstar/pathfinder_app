

// "use client";

// import React from "react";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Button } from "@/components/common/ui/Button";
// import { Avatar } from "@/components/common/ui/Avatar";

// interface UserPopoverProps {
//   userName: string;
//   guild?: string;
//   party?: string;
//   status?: string;
//   onLogout: () => void;
//   onSettingsClick?: () => void;
//   isMobile?: boolean;
// }

// const UserPopover: React.FC<UserPopoverProps> = ({
//   userName,
//   guild,
//   party,
//   status,
//   onLogout,
//   onSettingsClick,
//   isMobile = false,
// }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" className="p-0 h-auto w-auto">
//           <Avatar alt={userName} size="md" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent
//         align={isMobile ? "center" : "end"}
//         className="p-4 w-64 flex flex-col gap-2 z-50"
//       >
//         <div className="text-center font-semibold text-lg">{userName}</div>

//         <div className="text-sm text-gray-600 text-center">
//           Status: {status || "None"}
//         </div>
//         <div className="text-sm text-center">Guild: {guild || "None"}</div>
//         <div className="text-sm text-center">Party: {party || "None"}</div>

//         <Button variant="secondary" className="w-full mt-2" onClick={onSettingsClick}>
//           Settings
//         </Button>

//         <Button
//           variant="secondary"
//           className="w-full mt-1 bg-red-600 hover:bg-red-700 text-white"
//           onClick={onLogout}
//         >
//           Logout
//         </Button>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default UserPopover;
"use client";

import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/common/ui/Button";
import { Avatar } from "@/components/common/ui/Avatar";
import { useAtom } from "jotai";
import { userAtom } from "@/store/userAtom";

interface UserPopoverProps {
  userName: string;
  guild?: string;
  party?: string;
  status?: string;
  theme?: "dark" | "light";
  onLogout: () => void;
  onSettingsClick?: () => void;
  onEditAvatarClick?: () => void;
  isMobile?: boolean;
}

const UserPopover: React.FC<UserPopoverProps> = ({
  userName,
  guild,
  party,
  status,
  theme,
  onLogout,
  onSettingsClick,
  onEditAvatarClick, 
  isMobile = false,
}) => {
  const bgClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const [user] = useAtom(userAtom);

  // const profilePic = user.profilePic

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto w-auto">
        <Avatar src={user?.profilePic} alt={user?.userName || "User"} size="md" />


        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={isMobile ? "center" : "end"}
        className={`p-4 w-64 flex flex-col gap-2 z-50 ${bgClass}`}
      >
        <div className="text-center font-semibold text-lg">{userName}</div>

        <div className={`text-sm ${textSecondary} text-center`}>
          Status: {status || "None"}
        </div>
        <div className={`text-sm ${textSecondary} text-center`}>Guild: {guild || "None"}</div>
        <div className={`text-sm ${textSecondary} text-center`}>Party: {party || "None"}</div>

        <Button
          variant="secondary"
          className="w-full mt-2"
          onClick={onEditAvatarClick}
        >
          Change Profile Pic
        </Button>

        <Button
          variant="secondary"
          className="w-full mt-1"
          onClick={onSettingsClick}
        >
          Settings
        </Button>

        <Button
          variant="secondary"
          className="w-full mt-1 bg-red-600 hover:bg-red-700 text-white"
          onClick={onLogout}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
