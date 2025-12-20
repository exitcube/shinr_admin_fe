import { AuthService } from "@/services/auth";
import { ILoginPayload, ILoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const authService = new AuthService();

export const useLoginMutation = () => {
    return useMutation<ILoginResponse, Error, ILoginPayload>({
        mutationKey: ["login"],
        mutationFn: (payload) => authService.login(payload),
    });
};