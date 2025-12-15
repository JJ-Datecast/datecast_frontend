import React, { useState } from "react";
import "../css/Review.css";
import ReviewCard from "../components/ReviewCard";
import { useMyReviewsQuery } from "../../../networks/hooks/useReview";
import { useNavigate } from "react-router-dom";

const Review = ({ onSelectReview }) => {
  // 내가 작성한 후기 전체 조회
  const { data, isLoading, isError } = useMyReviewsQuery(0, 100); // 100개 정도 넉넉하게 가져오기

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const nav = useNavigate();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>리뷰를 불러오는 중 오류가 발생했습니다.</p>;

  // 백엔드 페이지 응답 구조에 맞춰 content 가져오기
  const reviewList = data?.data?.content || [];

  const totalPages = Math.ceil(reviewList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="review-list">
        {currentItems.map((item) => (
          <ReviewCard
            key={item.reviewId}
            image={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
            title={item.placeName}
            scheduleTitle={item.scheduleTitle}
            location={item.content}
            onClick={() =>
              nav(`/mypage/placeReviews/${item.reviewId}`, {
                state: { fromTab: "review" },
              })
            }
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Review;
