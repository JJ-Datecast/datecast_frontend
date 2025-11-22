import { useMutation } from "@tanstack/react-query";
import { socialLoginGoogle } from "../../../networks/apis/authApi";

export const useSocialLoginGoogle = () => {
  return useMutation({
    mutationFn: socialLoginGoogle,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};
