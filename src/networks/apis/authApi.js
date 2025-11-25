// src/networks/apis/authApi.js

import apiClient from "../client/apiClient";

// 로그아웃 요청
export const logoutRequest = () => {
  // accessToken은 mutation에서 제거하므로 여기선 제거 X
  return apiClient.post("/api/auth/logout", {}, { withCredentials: true });
};

// 로그인 후 토큰이 있을 때 호출되는 userMe
export const getUserMe = () => {
  return apiClient.get("/api/users/me").then((res) => res.data);
};