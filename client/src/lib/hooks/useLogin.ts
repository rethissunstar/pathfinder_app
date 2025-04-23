
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { loginUser } from "@/lib/api/user";
import { userAtom } from "@/store/userAtom";

export function useLogin() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (userName: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const { token, user } = await loginUser({ userName, password });
      document.cookie = `token=${token}; path=/`;
      setUser(user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
}
