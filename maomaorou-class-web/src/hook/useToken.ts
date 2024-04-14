"use client";

export default function useToken() {
  const tokenKey = "userToken";

  const getToken = () => {
    if (typeof window === "undefined") {
      return null;
    }
    const token = localStorage.getItem(tokenKey);
    return token;
  };

  const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
  };

  // Logout
  const cleanToken = () => {
    localStorage.removeItem(tokenKey);
  };

  return {
    token: getToken(),
    setToken,
    cleanToken,
  };
}
