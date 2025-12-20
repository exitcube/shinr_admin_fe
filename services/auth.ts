import { ILoginPayload } from "@/types/auth";

export class AuthService {
    login = async (payload: ILoginPayload) => {
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
}