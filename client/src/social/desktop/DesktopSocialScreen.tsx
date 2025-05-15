"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/Button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import FriendList from "../components/FriendList"; 

const DesktopSocialScreen: React.FC = () => {
  const [expandedFriends, setExpandedFriends] = useState(true); 
  const [expandedParty, setExpandedParty] = useState(true); 
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 min-w-full">
      {/* Left Section - Widgets */}
      <div className="w-full   p-4 space-y-4">
        <h2 className="text-lg font-bold">Widgets</h2>
        <ul>
          {/* Example widgets */}
          <li className="p-4 bg-gray-700 rounded-lg w-36">Character Creator</li>
          <li className="p-4 bg-gray-700 rounded-lg w-36">Play Character - Coming soon</li>
          <li className="p-4 bg-gray-700 rounded-lg w-36">Mapmaker?</li>
        </ul>
      </div>

      {/* Center Section - Posts or Messages */}
      <div className="w-full p-4">
        <Tabs defaultValue="posts" className="">
          <TabsList className="flex justify-between mb-4 bg-red-900">
          <TabsTrigger
              value="posts"
              className=" p-2 rounded-md group w-full"
              
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className=" p-2 rounded-md group w-full"
              
            >
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="posts"
            className="min-h-screen border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-bold">Posts</h2>
            Posts Coming soon
          </TabsContent>

          <TabsContent
            value="messages"
            className="min-h-screen border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-bold">Messages</h2>
            Messages coming soon
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Section - Friends and Party */}
      <div className="w-full p-4 space-y-4">
        <Accordion type="multiple">
          {/* Friends Section */}
          <AccordionItem value="friends">
            <AccordionTrigger onClick={() => setExpandedFriends(!expandedFriends)}>
              Friends
            </AccordionTrigger>
            <AccordionContent>
              <FriendList />
            </AccordionContent>
          </AccordionItem>

          {/* Party Section */}
          <AccordionItem value="party">
            <AccordionTrigger onClick={() => setExpandedParty(!expandedParty)}>
              Party
            </AccordionTrigger>
            <AccordionContent>
             Party functionality coming soon
              <div className="text-sm">Party members will be shown here.</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default DesktopSocialScreen;



// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/common/ui/Button";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import FriendList from "../components/FriendList"; // Assuming this is the correct path for your FriendList component

// const DesktopSocialScreen: React.FC = () => {
//   const [view, setView] = useState("posts"); // Toggle between "posts" and "messages"
//   const [expandedFriends, setExpandedFriends] = useState(true); // Control if friends accordion is expanded
//   const [expandedParty, setExpandedParty] = useState(true); // Control if party accordion is expanded

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 min-w-full">
//       {/* Left Section - Widgets */}
//       <div className="w-full bg-gray-800 text-white p-4 space-y-4">
//         <h2 className="text-lg font-bold">Widgets</h2>
//         <ul>
//           {/* Example widgets */}
//           <li className="p-4 bg-gray-700 rounded-lg w-36">Character Creator</li>
//           <li className="p-4 bg-gray-700 rounded-lg w-36">Play Character - Coming soon</li>
//           <li className="p-4 bg-gray-700 rounded-lg w-36">Mapmaker?</li>
//         </ul>
//       </div>

//       {/* Center Section - Posts or Messages */}
//       <div className="w-full p-4">
//         <div className="flex justify-between  p-4">
//           <Button onClick={() => setView(view === "posts" ? "messages" : "posts")}>
//             {view === "posts" ? "Messages" : "Posts"}
//           </Button>
//         </div>

//         {/* Conditional rendering of posts or messages */}
//         <div className="min-h-screen border rounded-lg p-4 bg-white dark:bg-gray-800">
//           {view === "posts" ? (
//             <div>
//               <h2 className="text-xl font-bold">Posts</h2>
//               Posts Coming soon
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-xl font-bold">Messages</h2>
//               Messages coming soon
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section - Friends and Party */}
//       <div className="w-full p-4 space-y-4">
//         <Accordion type="multiple">
//           {/* Friends Section */}
//           <AccordionItem value="friends">
//             <AccordionTrigger onClick={() => setExpandedFriends(!expandedFriends)}>
//               Friends
//             </AccordionTrigger>
//             <AccordionContent>
//               <FriendList /> {/* Assuming FriendList component to show the friends list */}
//             </AccordionContent>
//           </AccordionItem>

//           {/* Party Section */}
//           <AccordionItem value="party">
//             <AccordionTrigger onClick={() => setExpandedParty(!expandedParty)}>
//               Party
//             </AccordionTrigger>
//             <AccordionContent>
//               {/* Party component can be added here */}
//               <div className="text-sm">Party members will be shown here.</div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default DesktopSocialScreen;
