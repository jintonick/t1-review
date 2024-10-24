// api-instance.ts

import axios, { InternalAxiosRequestConfig } from "axios";
import { getTokens } from "@app/utils/auth-token-utils";

const apiInstance = axios.create({
  baseURL: "http://localhost:8080", // Updated to your local backend
  headers: {
    Accept: "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens();

    if (tokens && tokens.access_token) {
      config.headers["Authorization"] = `Bearer ${tokens.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;




