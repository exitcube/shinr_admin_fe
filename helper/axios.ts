import { getAccessToken } from "@/lib/utils";
import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000, // 10s timeout
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Add request interceptor
API.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// Add response interceptor (e.g., handle errors globally)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // optional: logout user / redirect to login
            console.warn("Unauthorized, redirecting to login...");
        }
        return Promise.reject(error);
    }
);

export default API;
