import { useParams, useNavigate } from "react-router-dom";
import { usePlaceReviewsQuery } from "../../networks/hooks/useReview";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import ReviewCard from "../../features/mypage/components/ReviewCard";

import "./PlaceReviewPage.css";

const PlaceReviewPage = () => {
  const { placeId } = useParams();
  const nav = useNavigate();

  const { data, isLoading, isError } = usePlaceReviewsQuery(placeId);

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>후기를 불러오지 못했습니다.</p>;

  const reviews = data?.content ?? [];

  console.log("🛰 API data:", data);
  console.log("📦 reviews:", reviews);

  return (
    <HeaderLayout>
      <div className="placeReviewPage">
        {/* 🔙 상단 왼쪽 버튼 */}
        <button className="placeReviewPage-back" onClick={() => nav(-1)}>
          ← 이전으로
        </button>

        <h2 className="placeReviewPage-title">후기</h2>

        {reviews.length === 0 && (
          <p className="placeReviewPage-empty">아직 작성된 후기가 없습니다.</p>
        )}

        {/* ⭐ 카드 그리드 */}
        <div className="placeReviewPage-grid">
          {reviews.map((review, index) => {
            const imageSrc = review.imageUrl
              ? `${import.meta.env.VITE_API_URL}${review.imageUrl}`
              : "/images/default-review.png";

            return (
              <ReviewCard
                key={review.reviewId}
                image={imageSrc}
                title={review.content}
                location={`${review.writerNickname} · ${new Date(
                  review.createdAt
                ).toLocaleDateString()}`}
                onClick={() =>
                  nav(`/mypage/placeReviews/${review.reviewId}`, {
                    state: {
                      from: "place",
                      placeId: review.placeId,
                    },
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </HeaderLayout>
  );
};
export default PlaceReviewPage;
