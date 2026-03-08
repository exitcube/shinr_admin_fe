"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { AuthService } from "@/services/auth";
import { clearApiAccessToken, setApiAccessToken } from "@/helper/axios";

const authService = new AuthService();

interface IAuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<string | null>;
  setSessionToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSessionToken = useCallback((token: string | null) => {
    setAccessToken(token);
    setApiAccessToken(token);
  }, []);

  const refreshSession = useCallback(async (): Promise<string | null> => {
    try {
      const refreshed = await authService.refreshAccessToken();
      setSessionToken(refreshed.accessToken);
      return refreshed.accessToken;
    } catch {
      setSessionToken(null);
      return null;
    }
  }, [setSessionToken]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      clearApiAccessToken();
    }
  }, []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        const tokenData = await authService.fetchTokenFromCookie();
        if (!active) return;
        setSessionToken(tokenData.accessToken);
      } catch {
        if (!active) return;
        await refreshSession();
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      active = false;
    };
  }, [refreshSession, setSessionToken]);

  const value: IAuthContext = useMemo(
    () => ({
      accessToken,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      refreshSession,
      setSessionToken,
      logout,
    }),
    [accessToken, isLoading, logout, refreshSession, setSessionToken],
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
