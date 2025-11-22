import React, { useState } from "react";
import "../css/Review.css";
import ReviewCard from "../components/ReviewCard";
import reviewCardData from "../../../util/get-reviewCard";

const Review = ({ onSelectReview }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 전체 페이지 수
  const totalPages = Math.ceil(reviewCardData.length / itemsPerPage);

  // 현재 페이지 데이터 잘라내기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewCardData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="review-list">
        {currentItems.map((item) => (
          <ReviewCard
            key={item.id}
            image={item.image}
            title={item.title}
            location={item.location}
            onClick={() => onSelectReview(item)}
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
