import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../../networks/apis/authApi";

export const useLogout = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      qc.clear();                      // 캐시 비움
      window.location.href = "/";      // 홈으로 이동
    },
  });
};
