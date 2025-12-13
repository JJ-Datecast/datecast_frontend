import { useState } from "react";
import "../css/ReviewDetail.css";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../../networks/hooks/useReview";

const ReviewDetail = ({ review, onBack }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(review.content);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(
    review.imageUrl ? `${import.meta.env.VITE_API_URL}${review.imageUrl}` : null
  );

  const deleteReviewMutation = useDeleteReviewMutation(review.placeId);
  const updateReviewMutation = useUpdateReviewMutation();

  /* =========================
     삭제
  ========================= */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteReviewMutation.mutate(review.reviewId, {
      onSuccess: () => {
        alert("후기가 삭제되었습니다.");
        onBack();
      },
      onError: () => alert("삭제 중 오류가 발생했습니다."),
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
     수정 저장 (FormData)
  ========================= */
  const handleUpdate = () => {
    if (!content.trim()) {
      alert("후기 내용을 입력해주세요.");
      return;
    }

    const dto = {
      placeId: review.placeId,
      rating: review.rating,
      content,
    };

    const formData = new FormData();

    // ⭐ dto는 반드시 Blob(JSON)
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    // ⭐ 이미지가 바뀌었을 때만 추가
    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateReviewMutation.mutate(
      {
        reviewId: review.reviewId,
        payload: formData,
      },
      {
        onSuccess: () => {
          alert("후기가 수정되었습니다.");
          setIsEditMode(false);
        },
        onError: () => {
          alert("수정 중 오류가 발생했습니다.");
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
          <img src={preview} className="detail-img" alt="review" />

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
        <div className="detail-title text-center">{review.placeName}</div>

        {isEditMode ? (
          <textarea
            className="edit-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="detail-text text-center">{review.content}</div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
