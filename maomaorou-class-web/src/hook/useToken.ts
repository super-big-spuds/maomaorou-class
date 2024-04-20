"use client";

import { useEffect, useState } from "react";

export default function useToken() {
  const tokenKey = "userToken";

  const [token, setTokenFn] = useState("");

  const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
    setTokenFn(token);
  };

  // Logout
  const cleanToken = () => {
    localStorage.removeItem(tokenKey);
    setTokenFn("");
  };

  useEffect(() => {
    const localToken = localStorage.getItem(tokenKey);
    setTokenFn(localToken === null ? "" : localToken);
  }, []);

  return {
    token,
    setToken,
    cleanToken,
  };
}
