import apiClient from "../client/apiClient";

/* =========================================================
   1) 데이트 후기 리스트 조회
   ========================================================= */
export const getDateReviews = (page = 0, size = 10) => {
  return apiClient.get("/api/date-reviews", {
    params: { page, size },
  });
};

/* =========================================================
   2) 데이트 후기 작성
   ========================================================= */
export const postDateReview = (formData) => {
  return apiClient.post("/api/date-reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* =========================================================
   3) 데이트 후기 상세 조회
   ========================================================= */
export const getDateReviewDetail = (dateReviewId) => {
  return apiClient.get(`/api/date-reviews/${dateReviewId}`);
};

/* =========================================================
   4) 데이트 후기 삭제
   ========================================================= */
export const deleteDateReview = (dateReviewId) => {
  return apiClient.delete(`/api/date-reviews/${dateReviewId}`);
};

/* =========================================================
   5) 데이트 후기 수정
   ========================================================= */
// dateReviewApi.js
export const patchDateReview = ({ dateReviewId, payload }) => {
  return apiClient.patch(
    `/api/date-reviews/${dateReviewId}`,
    payload
    // ✅ headers 절대 지정하지 말 것
  );
};


