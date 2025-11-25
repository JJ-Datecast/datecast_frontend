// src/hooks/useUser.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserMe, logoutRequest } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";

/* =========================================================
   1) 내 정보 조회 훅
   ========================================================= */
   export const useUserMe = () => {
    return useQuery({
      queryKey: ["userMe"],
      queryFn: getUserMe,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    });
  };

/* =========================================================
   2) 로그아웃 훅
   ========================================================= */
export const useLogout = () => {
  const qc = useQueryClient();
  const resetProfile = useProfileStore((state) => state.resetProfile);

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      // accessToken 삭제
      localStorage.removeItem("accessToken");

      // 프로필 store 초기화
      resetProfile();

      // 쿼리 캐시 삭제
      qc.clear();

      // 페이지 이동
      window.location.href = "/";
    },
  });
};
