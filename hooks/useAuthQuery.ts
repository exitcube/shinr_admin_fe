import { AuthService, TokenResponse } from "@/services/auth";
import { ILoginPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const authService = new AuthService();

export const useLoginMutation = () => {
    return useMutation<TokenResponse, Error, ILoginPayload>({
        mutationKey: ["login"],
        mutationFn: (payload) => authService.login(payload),
    });
};

export const useFetchAccessTokenQuery = () => {
    return useQuery<TokenResponse>({
        queryKey: ["accessToken"],
        queryFn: () => authService.fetchTokenFromCookie(),
    });
};
