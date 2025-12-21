import { AuthService } from "@/services/auth";
import { ILoginPayload, ILoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const authService = new AuthService();

export const useLoginMutation = () => {
    return useMutation<ILoginResponse, Error, ILoginPayload>({
        mutationKey: ["login"],
        mutationFn: (payload) => authService.login(payload),
    });
};

export const useFetchAccessTokenQuery = () => {
    return useQuery<{ message: string, accessToken: string }>({
        queryKey: ["accessToken"],
        queryFn: () => authService.fetchTokenFromCookie(),
    });
};