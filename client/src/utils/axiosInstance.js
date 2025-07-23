// utils/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Corrected to match your localStorage key
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("skillhub-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
