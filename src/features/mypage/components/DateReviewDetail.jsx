import { useEffect, useState } from "react";
import "../css/DateReviewDetail.css";
import {
  useDeleteDateReviewMutation,
  useUpdateDateReviewMutation,
  useDateReviewDetailQuery,
} from "../../../networks/hooks/useDateReview";

const DateReviewDetail = ({ review, onBack }) => {
  const reviewId = review.reviewId ?? review.dateReviewId;

  /* =========================
     최신 데이터 조회
  ========================= */
  const { data } = useDateReviewDetailQuery(reviewId);
  const latestReview = data?.data ?? review;

  /* =========================
     로컬 상태
  ========================= */
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* =========================
     데이터 동기화
  ========================= */
  useEffect(() => {
    if (!latestReview) return;

    setContent(latestReview.content ?? "");
    setRating(latestReview.rating ?? 0);
    setImageFile(null);

    setPreview(
      latestReview.imageUrl
        ? `${import.meta.env.VITE_API_URL}${latestReview.imageUrl}?t=${Date.now()}`
        : null
    );
  }, [latestReview]);

  const deleteDateReviewMutation = useDeleteDateReviewMutation();
  const updateDateReviewMutation = useUpdateDateReviewMutation();

  /* =========================
     삭제
  ========================= */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteDateReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        alert("데이트 후기가 삭제되었습니다.");
        onBack();
      },
    });
  };

  /* =========================
     이미지 변경
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
     수정 저장 (핵심)
  ========================= */
const handleUpdate = () => {
  if (!content.trim()) {
    alert("후기 내용을 입력해주세요.");
    return;
  }

  updateDateReviewMutation.mutate(
    {
      dateReviewId: reviewId,
      payload: { rating, content },
      image: imageFile || null,
    },
    {
      onSuccess: () => {
        alert("후기가 수정되었습니다.");
        setIsEditMode(false);
      },
    }
  );
};

  return (
    <div className="review-detail">
      {/* 상단 */}
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>

        <div className="detail-actions">
          {isEditMode ? (
            <>
              <button className="edit-btn" onClick={handleUpdate}>
                저장
              </button>
              <button
                className="delete-btn"
                onClick={() => setIsEditMode(false)}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={() => setIsEditMode(true)}>
                수정
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 이미지 */}
      {preview && (
        <div className="detail-img-box">
          <img src={preview} className="detail-img" alt="date-review" />

          {isEditMode && (
            <label className="image-edit-btn">
              이미지 변경
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      )}

      {/* 내용 */}
      <div className="detail-content">
        <div className="detail-title text-center">데이트 후기</div>

        {isEditMode && (
          <div className="star-rating text-center">
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
        )}

        {isEditMode ? (
          <textarea
            className="edit-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="detail-text text-center">{content}</div>
        )}
      </div>
    </div>
  );
};

export default DateReviewDetail;
