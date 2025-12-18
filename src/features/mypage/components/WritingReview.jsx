import React, { useState } from "react";
import "../css/WritingReview.css";
import HeaderLayout from "../../../shared/layout/HeaderLayout";
import ActionButton from "../../../shared/components/ActionButton";
import { useCreateReviewMutation } from "../../../networks/hooks/useReview";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const WritingReview = () => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);

  const { placeId } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const createReviewMutation = useCreateReviewMutation();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력해 주세요.");
      return;
    }

    const dto = {
      placeId: Number(placeId),
      rating,
      content,
    };

    const formData = new FormData();

    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // ⭐⭐⭐ 여기 추가! FormData 실제 내용 확인 ⭐⭐⭐
    for (let pair of formData.entries()) {
      console.log("🔥 FORM DATA:", pair[0], pair[1]);
    }

    createReviewMutation.mutate(formData, {
      onSuccess: () => {
        alert("후기 작성 완료!");
        nav(`/places/${placeId}`, {
          replace: true,
          state: { from: "reviewWrite" },
        });
      },
      onError: (err) => {
        console.error("리뷰 저장 실패:", err);
        alert("리뷰 저장 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <HeaderLayout>
      <div className="writingReview-container">
        <h2 className="writingReview-title">장소 후기 작성하기</h2>

        <div className="writingReview-box">
          <div className="writingReview-info">
            <span className="writingReview-icon">📌</span>
            <div>
              <h3 className="writingReview-info-title">리뷰를 작성해 주세요</h3>
              <p className="writingReview-info-desc">
                욕설, 비방, 명예훼손성 표현은 누구에게나 상처가 될 수 있습니다.
              </p>
            </div>
          </div>
          <div className="writingReview-rating">
            <span className="rating-label">별점</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "star active" : "star"}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-score">{rating} / 5</span>
          </div>

          <textarea
            className="writingReview-input"
            placeholder="리뷰 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="writingReview-image-area">
            <label className="writingReview-image-label">
              📷 사진 업로드
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <span className="writingReview-image-name">
              {imageFile ? imageFile.name : "선택된 파일 없음"}
            </span>
          </div>

          <div className="writingReview-button-wrapper">
            <ActionButton onClick={handleSubmit}>등록</ActionButton>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default WritingReview;
