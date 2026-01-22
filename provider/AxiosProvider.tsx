// context/AuthTokenContext.tsx
"use client";

import API from "@/helper/axios";
import { useFetchAccessTokenQuery } from "@/hooks/useAuthQuery";
import React, { createContext, useContext, useEffect, useMemo } from "react";

type AuthTokenContextType = {
  accessToken: string;
  isLoading: boolean;
};

const AuthTokenContext = createContext<AuthTokenContextType | null>(null);

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: tokenData, isLoading } = useFetchAccessTokenQuery();

  // Axios request interceptor
  useEffect(() => {
    if (!tokenData) return;
    const interceptor = API.interceptors.request.use((config) => {
      if (tokenData.accessToken) {
        config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
      }
      return config;
    });

    return () => {
      API.interceptors.request.eject(interceptor);
    };
  }, [tokenData]);
  
  const value: AuthTokenContextType = useMemo(() => {
    return {
      accessToken: tokenData?.accessToken || "",
      isLoading,
    };
  }, [tokenData, isLoading]);
  
  if (isLoading) return <div>Loading...</div>;
  

  return (
    <AuthTokenContext.Provider value={value}>
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = () => {
  const context = useContext(AuthTokenContext);
  if (!context) {
    throw new Error("useAuthToken must be used within AuthTokenProvider");
  }
  return context;
};
