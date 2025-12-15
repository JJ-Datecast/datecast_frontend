import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../css/DateReviewDetail.css";
import {
  useDeleteDateReviewMutation,
  useUpdateDateReviewMutation,
  useDateReviewDetailQuery,
} from "../../../networks/hooks/useDateReview";
import HeaderLayout from "../../../shared/layout/HeaderLayout";

const DateReviewDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();

  const fromTab = location.state?.fromTab || "basic";

  /* =========================
     데이터 조회
  ========================= */
  const { data, isLoading } = useDateReviewDetailQuery(id);
  const review = data?.data;

  /* =========================
     로컬 상태
  ========================= */
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!review) return;

    setContent(review.content ?? "");
    setRating(review.rating ?? 0);
    setImageFile(null);

    setPreview(
      review.imageUrl
        ? `${import.meta.env.VITE_API_URL}${review.imageUrl}?t=${Date.now()}`
        : null
    );
  }, [review]);

  const deleteDateReviewMutation = useDeleteDateReviewMutation();
  const updateDateReviewMutation = useUpdateDateReviewMutation();

  if (isLoading) return <p>로딩 중...</p>;
  if (!review) return <p>후기를 찾을 수 없습니다.</p>;

  /* =========================
     삭제
  ========================= */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteDateReviewMutation.mutate(id, {
      onSuccess: () => {
        alert("데이트 후기가 삭제되었습니다.");
        nav("/mypage", {
          state: { activeMenu: fromTab },
        });
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
     수정 저장
  ========================= */
  const handleUpdate = () => {
    if (!content.trim()) {
      alert("후기 내용을 입력해주세요.");
      return;
    }

    updateDateReviewMutation.mutate(
      {
        dateReviewId: id,
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
    <HeaderLayout>
      <div className="review-detail">
        <div className="detail-header">
          <button
            className="back-btn"
            onClick={() =>
              nav("/mypageView", {
                state: { activeMenu: fromTab },
              })
            }
          >
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
                <button
                  className="edit-btn"
                  onClick={() => setIsEditMode(true)}
                >
                  수정
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>

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

        <div className="detail-content">
          <div className="detail-title text-center">{review.scheduleTitle}</div>

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
    </HeaderLayout>
  );
};

export default DateReviewDetail;
