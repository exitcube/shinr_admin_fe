import { ILoginPayload } from "@/types/auth";

export interface TokenResponse {
  message: string;
  accessToken: string;
}

export class AuthService {
  login = async (payload: ILoginPayload): Promise<TokenResponse> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    return res.json();
  };

  fetchTokenFromCookie = async (): Promise<TokenResponse> => {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to fetch token");
    }

    return res.json();
  };

  refreshAccessToken = async (): Promise<TokenResponse> => {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Session expired");
    }

    return res.json();
  };

  logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Logout failed");
    }
  };
}
