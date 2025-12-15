import React, { use, useState } from "react";
import "../css/SavedPlace.css";
import ReviewCard from "../components/ReviewCard";
import { useBookmarkedPlacesQuery } from "../../../networks/hooks/usePlace";
import { useNavigate } from "react-router-dom";

const SavedPlace = () => {
  const { data, isLoading, isError } = useBookmarkedPlacesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const nav = useNavigate();

  const itemsPerPage = 6;

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>데이터를 불러오는데 실패했어요 🥲</div>;

  const bookmarkedPlaces = data || [];

  const totalPages = Math.ceil(bookmarkedPlaces.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = bookmarkedPlaces.slice(indexOfFirst, indexOfLast);

  if (bookmarkedPlaces.length === 0) {
    return (
      <div
        className="empty-review"
        style={{ textAlign: "center", marginTop: "120px" }}
      >
        <p style={{ fontSize: "20PX" }}>저장된 장소가 없습니다.</p>
        <p style={{ fontSize: "20PX" }}>가고 싶은 장소를 저장해보세요.💕</p>
      </div>
    );
  }

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="saved-place-container">
      <div className="saved-place-list">
        {currentItems.map((item) => (
          <ReviewCard
            key={item.bookmarkId}
            image={item.imageUrl}
            title={item.name}
            location={item.address}
            onClick={() =>
              nav(`/place/${item.placeId}`, {
                state: { from: "mypage" },
              })
            }
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
    </div>
  );
};

export default SavedPlace;
