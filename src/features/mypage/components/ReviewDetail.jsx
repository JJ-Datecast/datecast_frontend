import { useState, useEffect } from "react";
import "../css/ReviewDetail.css";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  usePlaceReviewDetailQuery,
} from "../../../networks/hooks/useReview";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import HeaderLayout from "../../../shared/layout/HeaderLayout";

const ReviewDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation();

  /* =========================
     어디서 왔는지 (탭 복구용)
  ========================= */

  // 🔑 state로 전달된 값들
  const from = location.state?.from; // "mypage" | "place"
  const fromTab = location.state?.fromTab; // "review" 등
  const placeId = location.state?.placeId; // 장소에서 온 경우

  /* =========================
     후기 상세 조회
  ========================= */
  const { data, isLoading, isError } = usePlaceReviewDetailQuery(id);
  const review = data?.data;

  /* =========================
     로컬 상태
  ========================= */
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0); // ⭐ 추가
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* =========================
     서버 데이터 → 로컬 상태 동기화
  ========================= */
  useEffect(() => {
    if (!review) return;

    setContent(review.content ?? "");
    setRating(review.rating ?? 0); // ⭐ 별점 동기화
    setImageFile(null);

    setPreview(
      review.imageUrl
        ? `${import.meta.env.VITE_API_URL}${review.imageUrl}?t=${Date.now()}`
        : null
    );
  }, [review]);

  /* =========================
     Mutation
  ========================= */
  const deleteReviewMutation = useDeleteReviewMutation(review?.placeId);
  const updateReviewMutation = useUpdateReviewMutation();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !review) return <p>후기를 불러올 수 없습니다.</p>;

  /* =========================
     삭제
  ========================= */
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    deleteReviewMutation.mutate(review.reviewId, {
      onSuccess: () => {
        alert("후기가 삭제되었습니다.");
        nav("/mypageView", {
          state: { activeMenu: fromTab },
        });
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
     수정 저장
  ========================= */
  const handleUpdate = () => {
    if (!content.trim()) {
      alert("후기 내용을 입력해주세요.");
      return;
    }

    const dto = {
      placeId: review.placeId,
      rating, // ⭐ 수정된 별점 전송
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
        onError: () => alert("수정 중 오류가 발생했습니다."),
      }
    );
  };

  return (
    <HeaderLayout>
      <div className="review-detail">
        {/* 상단 */}
        <div className="detail-header">
          <button
            className="back-btn"
            onClick={() => {
              if (from === "place" && placeId) {
                // 장소 → 후기 → 리뷰 상세
                nav(`/places/${placeId}`);
              } else if (from === "mypage" && fromTab) {
                // 마이페이지 → 리뷰 상세
                nav("/mypageView", {
                  state: { activeMenu: fromTab },
                });
              } else {
                // 예외 / 직접 접근
                nav(-1);
              }
            }}
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

          {/* ⭐ 별점 영역 (조회 + 수정 공통) */}
          <div className="detail-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= rating ? "detail-star active" : "detail-star"
                }
                onClick={() => isEditMode && setRating(star)}
              >
                ★
              </span>
            ))}
            <span className="rating-score">{rating} / 5</span>
          </div>

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
    </HeaderLayout>
  );
};

export default ReviewDetail;
