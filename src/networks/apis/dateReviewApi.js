import apiClient from "../client/apiClient";



/* =========================
   후기 생성
========================= */
export const createDateReview = (formData) => {
  return apiClient.post("/api/date-reviews", formData);
};

/* =========================
   후기 목록 조회
========================= */

export const getDateReviews = (page = 0, size = 10) => {
  return apiClient.get("/api/date-reviews", {
    params: { page, size },
  });
};


/* =========================
   후기 상세 조회
========================= */
export const getDateReviewDetail = (reviewId) => {
  if (!reviewId) {
    throw new Error("reviewId is required");
  }
  return apiClient.get(`/api/date-reviews/${reviewId}`);
};

/* =========================
   후기 수정 (수정됨: FormData 사용)
========================= */
export const updateDateReview = ({ dateReviewId, payload, image }) => {
  if (!dateReviewId) {
    throw new Error("dateReviewId is required");
  }

  // 이미지 없는 경우 → JSON
  if (!image) {
    return apiClient.patch(
      `/api/date-reviews/${dateReviewId}`,
      payload
    );
  }

  // 이미지 있는 경우 → multipart + /image
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
  formData.append("image", image);

  return apiClient.patch(
    `/api/date-reviews/${dateReviewId}/image`,
    formData
  );
};

/* =========================
   후기 삭제
========================= */
export const deleteDateReview = (reviewId) => {
  if (!reviewId) {
    throw new Error("reviewId is required");
  }
  return apiClient.delete(`/api/date-reviews/${reviewId}`);
};

