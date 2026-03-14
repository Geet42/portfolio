import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 60000,
});

// Auto-retry once on timeout (handles Render free tier cold starts)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (
      !config._retried &&
      (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK" || !error.response)
    ) {
      config._retried = true;
      return api(config);
    }
    return Promise.reject(error);
  }
);
