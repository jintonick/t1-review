import axios, { InternalAxiosRequestConfig } from "axios";
import { getTokens } from "@app/utils/auth-token-utils";

const apiInstance = axios.create({
  baseURL: "https://uvio.pro",
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




