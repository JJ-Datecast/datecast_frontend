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
   export const postCoupleInvitationAccept = ({ token }) => {
    return apiClient.post(`/api/couple-invitations/accept?token=${token}`);
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
