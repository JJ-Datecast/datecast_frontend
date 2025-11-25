// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://54.180.105.226:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// apiClient.interceptors.response.use(
//   (res) => res,

//   async (error) => {
//     const originalRequest = error.config;

//     // accessToken 만료 → 401
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         // refreshToken 요청 중이면 큐에 대기
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return apiClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // 🔁 Refresh API 문서에 맞게 수정됨
//         const refreshResponse = await axios.post(
//           "http://54.180.105.226:8080/api/auth/refresh",
//           { refreshToken }
//         );

//         const newAccessToken = refreshResponse.data.accessToken;

//         localStorage.setItem("accessToken", newAccessToken);
//         apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

//         processQueue(null, newAccessToken);

//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);

//         // refresh 실패 → 강제 로그아웃
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;
