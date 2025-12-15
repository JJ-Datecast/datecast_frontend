// networks/client/publicApi.js
import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ⭐ 토큰 있으면만 Authorization 추가
publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default publicApi;
