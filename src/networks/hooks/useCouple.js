import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postCoupleInvitation,
  postCoupleInvitationAccept,
  getCoupleMe,
  deleteCoupleMe,
} from "../../networks/apis/coupleApi";

/* =========================================================
   1) 내 커플 정보 조회 훅
   ========================================================= */
export const useCoupleMe = () => {
  return useQuery({
    queryKey: ["coupleMe"],
    queryFn: getCoupleMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/* =========================================================
   2) 커플 초대 보내기 훅
   ========================================================= */
export const useCoupleInvitation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: postCoupleInvitation,
    onSuccess: () => {
      // 초대 후 커플 정보 다시 조회
      qc.invalidateQueries(["coupleMe"]);
    },
  });
};

/* =========================================================
   3) 커플 초대 수락 훅
   ========================================================= */
   export const useCoupleInvitationAccept = () => {
    const qc = useQueryClient();
  
    return useMutation({
      mutationFn: postCoupleInvitationAccept,
      onSuccess: () => {
        qc.invalidateQueries(["coupleMe"]);
      },
      onError: (err) => {
        console.error("커플 초대 수락 실패:", err);
      }
    });
  };
  

/* =========================================================
   4) 커플 해제 훅
   ========================================================= */
export const useCoupleDelete = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupleMe,
    onSuccess: () => {
      qc.invalidateQueries(["coupleMe"]);
    },
  });
};
