import React, { useState } from "react";
import "../css/Review.css";
import ReviewCard from "../components/ReviewCard";
import { useDateReviewsQuery } from "../../../networks/hooks/useDateReview";
import { useNavigate } from "react-router-dom";

const DateReview = () => {
  const { data, isLoading, isError } = useDateReviewsQuery(0, 100);
  const [currentPage, setCurrentPage] = useState(1);
  const nav = useNavigate();

  const itemsPerPage = 6;

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이트 후기를 불러오는 중 오류 발생</p>;

  const reviewList = data?.data?.content || [];
  const totalPages = Math.ceil(reviewList.length / itemsPerPage);

  /* =========================
     후기 없음 처리
  ========================= */
  if (reviewList.length === 0) {
    return (
      <div className="empty-review">
        <p>아직 등록된 데이트 후기가 없습니다.</p>
        <p>캘린더에서 일정을 등록하고 후기를 작성해보세요 💕</p>
      </div>
    );
  }

  const currentItems = reviewList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="review-list">
        {currentItems.map((item) => (
          <ReviewCard
            key={item.reviewId}
            image={
              item.imageUrl
                ? `${import.meta.env.VITE_API_URL}${item.imageUrl}`
                : null
            }
            title={item.scheduleTitle}
            location={item.content}
            onClick={() =>
              nav(`/mypage/date-reviews/${item.reviewId}`, {
                state: { fromTab: "coupleReview" },
              })
            }
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default DateReview;
