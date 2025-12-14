import React, { useState } from "react";
import "../css/Review.css"; // 기존 리뷰 css 재사용해도 OK
import ReviewCard from "../components/ReviewCard";
import { useDateReviewsQuery } from "../../../networks/hooks/useDateReview";

const DateReview = ({ onSelectReview }) => {
  // 데이트 후기 전체 조회
  const { data, isLoading, isError } = useDateReviewsQuery(0, 100);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이트 후기를 불러오는 중 오류가 발생했습니다.</p>;

  // 백엔드 page 응답 구조에 맞춰 content 꺼내기
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
            key={item.dateReviewId}
            image={
              item.imageUrl
                ? `${import.meta.env.VITE_API_URL}${item.imageUrl}`
                : null
            }
            title={item.scheduleTitle}
            location={item.content}
            onClick={() => onSelectReview(item)}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
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
      )}
    </>
  );
};

export default DateReview;
