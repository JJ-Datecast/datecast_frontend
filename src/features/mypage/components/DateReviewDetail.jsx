import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../css/DateReviewDetail.css";
import {
  useDeleteDateReviewMutation,
  useUpdateDateReviewMutation,
  useDateReviewDetailQuery,
} from "../../../networks/hooks/useDateReview";
import HeaderLayout from "../../../shared/layout/HeaderLayout";

/* =========================
   감정 ↔ rating 매핑
========================= */
const EMOTIONS = [
  { key: "HAPPY", label: "행복", emoji: "😊", rating: 5 },
  { key: "EXCITED", label: "설렘", emoji: "💖", rating: 4 },
  { key: "SOSO", label: "보통", emoji: "😐", rating: 3 },
  { key: "BAD", label: "별로", emoji: "😕", rating: 2 },
  { key: "ANGRY", label: "화남", emoji: "😡", rating: 1 },
];

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

  /* =========================
     서버 → 로컬 동기화
  ========================= */
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
     현재 감정 계산
  ========================= */
  const currentEmotion = EMOTIONS.find((item) => item.rating === rating);

  /* =========================
     삭제
  ========================= */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteDateReviewMutation.mutate(id, {
      onSuccess: () => {
        alert("데이트 후기가 삭제되었습니다.");
        nav("/mypageView", {
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
        payload: {
          rating,
          content,
        },
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

  /* 날짜 포맷 */
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("ko-KR")
    : "";

  return (
    <HeaderLayout>
      <div className="review-detail">
        {/* 상단 */}
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
          <div className="detail-title text-center">{review.scheduleTitle}</div>

          {/* ⭐ 작성자 + 날짜 */}
          <div className="review-meta text-center">
            <span className="review-author">{review.authorName}</span>
            <span className="review-dot">·</span>
            <span className="review-date">{formattedDate}</span>
          </div>

          {/* ⭐ 조회 모드 감정 */}
          {!isEditMode && currentEmotion && (
            <div className="emotion-view text-center">
              <span className="emotion-emoji">{currentEmotion.emoji}</span>
              <span className="emotion-label">{currentEmotion.label}</span>
            </div>
          )}

          {/* ⭐ 수정 모드 감정 선택 */}
          {isEditMode && (
            <div className="emotion-selector text-center">
              {EMOTIONS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`emotion-btn ${
                    rating === item.rating ? "active" : ""
                  }`}
                  onClick={() => setRating(item.rating)}
                >
                  <span className="emotion-emoji">{item.emoji}</span>
                  <span className="emotion-label">{item.label}</span>
                </button>
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
