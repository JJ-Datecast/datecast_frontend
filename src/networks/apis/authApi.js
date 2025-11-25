import apiClient from "../client/apiClient";

export const logoutRequest = () => {
  localStorage.removeItem("accessToken"); // 먼저 제거
  return apiClient.post("/auth/logout", {}, { withCredentials: true });
};

export const getMyInfo = () => apiClient.get("/users/me");
