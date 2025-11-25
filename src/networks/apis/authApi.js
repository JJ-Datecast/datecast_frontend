import apiClient from "../client/apiClient";

export const logoutRequest = () => apiClient.post("/auth/logout");
export const getMyInfo = () => apiClient.get("/users/me");
