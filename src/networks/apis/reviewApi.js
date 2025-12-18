// src/networks/apis/reviewApi.js
import apiClient from "../client/apiClient";

/* =========================================================
   1) 장소 후기 리스트 조회
   ========================================================= */
   export const getPlaceReviews = async (placeId) => {
    const res = await apiClient.get("/api/place-reviews", {
      params: { placeId },
    });
    return res.data; // ⭐ 핵심
  };
/* =========================================================
   2) 장소 후기 작성 (최종 리뷰 저장)
   ========================================================= */
   export const postPlaceReview = (formData) => {
    return apiClient.post("/api/place-reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  

/* =========================================================
   3) 장소 방문 인증 (GPS 인증)
   ========================================================= */
export const verifyPlaceReview = (payload) => {
  // payload = { placeId, currentLatitude, currentLongitude }
  return apiClient.post("/api/place-reviews/verify", payload);
};

/* =========================================================
   4) 장소 후기 상세 조회
   ========================================================= */
   export const getPlaceReviewDetail = (reviewId) => {
    return apiClient.get(`/api/place-reviews/${reviewId}`);
  };
  

/* =========================================================
   5) 장소 후기 삭제
   ========================================================= */
   export const deletePlaceReview = (reviewId) => {
    return apiClient.delete(`/api/place-reviews/${reviewId}`);
  };

/* =========================================================
   6) 장소 후기 수정
   ========================================================= */
   export const patchPlaceReview = ({ reviewId, payload }) => {
    return apiClient.patch(`/api/place-reviews/${reviewId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  /* =========================================================
   7) 내가 쓴 후기 전체 조회
   ========================================================= */
export const getMyReviews = (page = 0, size = 10) => {
  return apiClient.get(`/api/place-reviews/me?page=${page}&size=${size}`);
};
