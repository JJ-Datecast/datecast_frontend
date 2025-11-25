import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://54.180.105.226:8080/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // refreshToken cookie 전달
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach(p => error ? p.reject(error) : p.resolve(token));
  queue = [];
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return apiClient(original);
        });
      }

      isRefreshing = true;

      try {
        const res = await apiClient.post("/auth/refresh");
        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return apiClient(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;
