"use client";

import React, { useState } from "react";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import { useLogin } from "@/lib/hooks/useLogin"; 

const DesktopLoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, loading } = useLogin();

  return (
    <div className="flex items-center justify-center bg-blue-600 p-4 min-h-screen">
       <Card variant="desktop" className="w-full max-w-xl p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center pb-4 pt-4">Desktop Login</h1>

        <div className="flex flex-col p-4 space-y-4 justify-center items-center">
          {/* <Input
            placeholder="Username"
            className="w-3/4 h-16 border rounded bg-red-50"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-3/4 h-32 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}

<Input
  placeholder="Username"
  className="w-3/4 h-16 text-lg p-4 border rounded-lg bg-red-300"
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
/>
<Input
  type="password"
  placeholder="Password"
  className="w-3/4 h-16 text-lg p-4 border rounded-lg bg-red-300"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>


          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            className="w-3/4"
            onClick={() => handleLogin(userName, password)}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
// import { Card } from "@/components/common/ui/Card";
// import { loginUser } from "@/lib/api/user";
// import { useSetAtom } from "jotai";
// import { userAtom } from "@/store/userAtom";

// const DesktopLoginScreen = () => {
//   const router = useRouter();
//   const setUser = useSetAtom(userAtom);

//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       const { token, user } = await loginUser({ userName, password });

//       // ✅ Save token in cookie or localStorage
//       document.cookie = `token=${token}; path=/`; 

//       // ✅ Set user in global state
//       setUser(user);

//       router.push("/");
//     } catch (err: any) {
//       console.log("this is the error", err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-800 p-4 min-h-screen">
//       <Card variant="desktop" className="w-full max-w-xl p-8 flex flex-col gap-6 h-[80vh]">
//         <h1 className="text-3xl font-bold text-center pb-4">Desktop Login</h1>

//         <div className="flex flex-col p-4 space-y-4">
//           <Input
//             placeholder="Username"
//             className="w-full h-16 border rounded"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             className="w-full h-16 border rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <Button className="w-full" onClick={handleLogin}>
//             Login
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default DesktopLoginScreen;
