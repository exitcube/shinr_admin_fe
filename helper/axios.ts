import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type AuthInterceptorOptions = {
  refreshAccessToken: () => Promise<string | null>;
  onUnauthorized?: () => void;
};

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setApiAccessToken = (token: string | null) => {
  accessToken = token;
};

export const clearApiAccessToken = () => {
  accessToken = null;
};

export const getApiAccessToken = () => accessToken;

const shouldSkipRefresh = (requestUrl?: string): boolean => {
  if (!requestUrl) return false;
  return requestUrl.includes("/admin/generate-refreshToken");
};

export const setupAxiosAuthInterceptors = ({
  refreshAccessToken,
  onUnauthorized,
}: AuthInterceptorOptions) => {
  const requestInterceptor = API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
  );

  const responseInterceptor = API.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryRequestConfig | undefined;
      const status = error.response?.status;

      if (
        typeof window === "undefined" ||
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        shouldSkipRefresh(originalRequest.url)
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const nextAccessToken = await refreshPromise;
        if (!nextAccessToken) {
          onUnauthorized?.();
          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

        return API(originalRequest as AxiosRequestConfig);
      } catch (refreshError) {
        onUnauthorized?.();
        return Promise.reject(refreshError);
      }
    },
  );

  return () => {
    API.interceptors.request.eject(requestInterceptor);
    API.interceptors.response.eject(responseInterceptor);
  };
};

export default API;
