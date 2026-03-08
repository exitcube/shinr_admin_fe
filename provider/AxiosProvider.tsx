"use client";

import {
  setApiAccessToken,
  setupAxiosAuthInterceptors,
} from "@/helper/axios";
import { useAuthContext } from "@/provider/AuthContext";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useMemo } from "react";

type AuthTokenContextType = {
  accessToken: string | null;
  isLoading: boolean;
};

const AuthTokenContext = createContext<AuthTokenContextType | null>(null);

export const AuthTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { accessToken, isLoading, isAuthenticated, refreshSession } =
    useAuthContext();

  useEffect(() => {
    setApiAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const teardown = setupAxiosAuthInterceptors({
      refreshAccessToken: refreshSession,
      onUnauthorized: () => {
        router.replace("/");
      },
    });

    return () => {
      teardown();
    };
  }, [refreshSession, router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const value: AuthTokenContextType = useMemo(() => {
    return {
      accessToken,
      isLoading,
    };
  }, [accessToken, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return null;

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
