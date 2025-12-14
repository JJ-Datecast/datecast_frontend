import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DateReviewPage.css";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import { useCreateDateReviewMutation } from "../../networks/hooks/useDateReview";

const DateReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const createDateReviewMutation = useCreateDateReviewMutation();

  // Calendar에서 넘어온 데이터
  const scheduleDate = state?.date; // "2025-12-11"
  const title = state?.title;
  const place = state?.place;

  const displayDate = scheduleDate
    ? `${scheduleDate.split("-")[1]}월 ${scheduleDate.split("-")[2]}일`
    : "";

  /* =========================
     이미지 선택
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  /* =========================
     후기 작성 (POST)
  ========================= */
  const handleSubmit = () => {
    if (!rating) {
      alert("별점을 선택해 주세요.");
      return;
    }

    if (!content.trim()) {
      alert("후기 내용을 입력해 주세요.");
      return;
    }

    // ⭐ dto
    const dto = {
      rating,
      content,
    };

    // ⭐ FormData
    const formData = new FormData();

    // dto는 반드시 Blob(JSON)으로
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    // 이미지 선택한 경우만 추가
    if (image) {
      formData.append("image", image);
    }

    createDateReviewMutation.mutate(formData, {
      onSuccess: () => {
        alert("데이트 후기가 등록되었습니다 💕");
        navigate(-1); // 이전 페이지(캘린더)로
      },
      onError: (err) => {
        console.error("데이트 후기 등록 실패:", err);
        alert("후기 등록 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <HeaderLayout>
      <div className="date-review-page">
        {/* 제목 */}
        <h2 className="date-review-title">{displayDate} 데이트 후기</h2>

        {/* 일정 정보 */}
        <div className="date-info-box">
          <p className="date-info-title">{title}</p>
          {place && <p className="date-info-place">📍 {place}</p>}
        </div>

        {/* 별점 */}
        <div className="date-review-section">
          <label className="section-label">데이트 별점</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* 후기 작성 */}
        <div className="date-review-section">
          <label className="section-label">후기 작성</label>
          <textarea
            className="review-textarea"
            placeholder="데이트 후기를 작성해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 이미지 등록 */}
        <div className="date-review-section">
          <label className="section-label">이미지 등록</label>

          <label className="image-upload-box">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <span>📷 이미지 선택</span>
          </label>

          <p className="image-file-name">
            {image ? image.name : "선택된 파일 없음"}
          </p>
        </div>

        {/* 작성 버튼 */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={createDateReviewMutation.isLoading}
        >
          후기 작성
        </button>
      </div>
    </HeaderLayout>
  );
};

export default DateReviewPage;
