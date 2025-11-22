import { apiClient } from "../client/apiClient";

export const socialLoginGoogle = (code) =>
  apiClient.post("/auth/social/login/google", { code });
