import axios from "axios";

export const api = axios.create({
  baseURL: "https://portfolio-backend-5yxx.onrender.com/api",
  timeout: 10000,
});