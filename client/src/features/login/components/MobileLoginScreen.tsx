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


