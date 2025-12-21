import { ILoginPayload } from "@/types/auth";

export class AuthService {
    login = async (payload: ILoginPayload) => {
        try {
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
        } catch (error) {
            throw error;
        }
    };

    fetchTokenFromCookie = async (): Promise<{ message: string, accessToken: string }> => {
        try {
            const res = await fetch("/api/auth/token", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch token");
            }

            return res.json();
        } catch (error) {
            throw error;
        }
    };
}