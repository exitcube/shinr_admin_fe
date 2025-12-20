export interface ILoginPayload {
    userName: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}