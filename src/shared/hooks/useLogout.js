import { useMutation,useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../../networks/apis/authApi";

export const useLogout = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      qc.clear();
      window.location.href = "/";
    },
  });
};
