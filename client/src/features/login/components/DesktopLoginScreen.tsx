"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { loginUser } from "@/lib/api/user";
import { Card } from "@/components/common/ui/Card";

const DesktopLoginScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser({ userName, password });
      document.cookie = "loggedIn=true; path=/";
      router.push("/");
    } catch (err: any) {
      console.log("this is the error", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-800 p-4  min-h-screen">
<Card
  variant="desktop"
  className="w-full max-w-xl p-8 flex flex-col gap-6 h-[80vh]"
>
  <h1 className="text-3xl font-bold text-center pb-4">Desktop Login</h1>

  <div className="flex flex-col p-4 space-y-4">
    <Input
      placeholder="Username"
      className="w-full h-16 border rounded"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
    <Input
      type="password"
      placeholder="Password"
      className="w-full h-16 border rounded"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {error && <p className="text-red-600 text-sm">{error}</p>}

    <Button className="w-full" onClick={handleLogin}>
      Login
    </Button>
  </div>
</Card>

    </div>
  );
};

export default DesktopLoginScreen;




// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/common/ui/Input";
// import { Button } from "@/components/common/ui/Button";
// import { loginUser } from "@/lib/api/user";
// import { Card } from "@/components/common/ui/Card";

// const DesktopLoginScreen = () => {
//   const router = useRouter();
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser({ userName, password });

//       document.cookie = "loggedIn=true; path=/";
//       router.push("/");
//     } catch (err: any) {
//       console.log("this is the error", err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full">
//      <Card className="min-h-screen w-full" variant="desktop" title="Desktop Login">
//      <form onSubmit={handleLogin} className="space-y-5 w-1/2">
//           <Input
//             placeholder="Username"
//             className="w-full"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             className="w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <Button className="w-full" type="submit">
//             Login
//           </Button>
//         </form>
//      </Card>
//     </div>
//   );
// };

// export default DesktopLoginScreen;
