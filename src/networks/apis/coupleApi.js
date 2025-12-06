import apiClient from "../client/apiClient";

/* =========================================================
   1) 커플 초대 보내기
   ========================================================= */
export const postCoupleInvitation = (payload) => {
  // payload = { partnerCode: string } 등
  return apiClient.post("/api/couple-invitations", payload);
};

/* =========================================================
   2) 커플 초대 수락
   ========================================================= */
   export const postCoupleInvitationAccept = async ({ token }) => {
    const res = await apiClient.post("/api/couple-invitations/accept", { token });
  
    // 백이 성공 시 보통 200, 201, 204 반환
    if (![200, 201, 204].includes(res.status)) {
      throw new Error("커플 수락 실패");
    }
  
    return res.data;
  };
  
  
  
/* =========================================================
   3) 내 커플 정보 조회
   ========================================================= */
export const getCoupleMe = () => {
  return apiClient.get("/api/couples/me");
};

/* =========================================================
   4) 커플 해제
   ========================================================= */
export const deleteCoupleMe = () => {
  return apiClient.delete("/api/couples/me");
};
