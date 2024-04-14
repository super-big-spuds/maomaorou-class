"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useToken from "./../hook/useToken";
import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";

type IUserData = null | {
  id: string;
  username: string;
  email: string;
};

type IError = string | undefined;

const context = createContext({
  userData: null as IUserData,
  isLoading: true,
  error: undefined as IError,
  handleLogout: () => {},
});

const GET_USER_PROFILE_QUERY = gql(`
query getUserProfile {
  me {
    id
    username
    email
  }
}
`);

export function useUser() {
  const contextData = useContext(context);

  if (!contextData) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return contextData;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { token, cleanToken } = useToken();
  const { data, loading, error } = useQuery(GET_USER_PROFILE_QUERY, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [userData, setUserData] = useState<IUserData>(null);

  const handleLogout = () => {
    cleanToken();
    setUserData(null);
  };

  useEffect(() => {
    if (data && data.me && data.me.id && data.me.username && data.me.email) {
      setUserData({
        id: data.me.id,
        username: data.me.username,
        email: data.me.email,
      });
    }
  }, [data]);

  return (
    <context.Provider
      value={{
        userData,
        isLoading: loading,
        error: error?.message,
        handleLogout,
      }}
    >
      {children}
    </context.Provider>
  );
}
