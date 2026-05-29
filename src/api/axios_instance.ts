import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { getAuthToken, removeAuthData } from "../features/auth/auth_storage";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      removeAuthData();
    }

    return Promise.reject(error);
  },
);
