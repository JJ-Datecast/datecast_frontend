import axios from "axios";

const instance = axios.create({
  baseURL: "https://datecast.site",
});

// ⭐ 요청마다 JWT 자동으로 포함시키는 interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 저장한 토큰 꺼내기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
