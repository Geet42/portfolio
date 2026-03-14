import axios from "axios";

// In production (Vercel), VITE_API_URL points to the Render backend
// In local dev, falls back to localhost:8080
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});