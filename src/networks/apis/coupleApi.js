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
  
    // 서버 응답 형태가 예시로 아래라 가정
    // { success: true, coupleId: 4 } 또는 { success: false, message: "..."}
    if (!res.data || res.data.success === false) {
      throw new Error(res.data?.message || "커플 수락 실패");
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
