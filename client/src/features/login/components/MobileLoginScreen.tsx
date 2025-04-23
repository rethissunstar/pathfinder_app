"use client";

import React, { useState } from "react";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { useLogin } from "@/lib/hooks/useLogin";

const MobileLoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, loading } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <h1 className="text-2xl font-bold mb-6">Login (Mobile)</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(userName, password);
        }}
        className="w-full max-w-sm space-y-4"
      >
        <Input
          placeholder="Username"
          className="w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default MobileLoginScreen;


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/common/ui/Input";
// import { Button } from "@/components/common/ui/Button";
// import { loginUser } from "@/lib/api/user";
// import { useSetAtom } from "jotai";
// import { userAtom } from "@/store/userAtom";

// const MobileLoginScreen = () => {
//   const router = useRouter();
//   const setUser = useSetAtom(userAtom);

//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { token, user } = await loginUser({ userName, password });

//       // ✅ Store the token in a cookie
//       document.cookie = `token=${token}; path=/`;

//       // ✅ Update Jotai user atom
//       setUser(user);

//       // ✅ Redirect to home
//       router.push("/");
//     } catch (err: any) {
//       console.log("this is the error", err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
//       <h1 className="text-2xl font-bold mb-6">Login (Mobile)</h1>

//       <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
//         <Input
//           placeholder="Username"
//           className="w-full"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           className="w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <Button className="w-full" type="submit">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default MobileLoginScreen;
