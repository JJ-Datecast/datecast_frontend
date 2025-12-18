import { useParams, useSearchParams } from "react-router-dom";
import { usePlacesByRegionQuery } from "../../networks/hooks/usePlace";
import categoryData from "../../util/get-categoryButton";
import CategoryButton from "../../shared/components/CategoryButton";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import PlaceCard from "../../shared/components/PlaceCard";
import "./PlaceList.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 6;

const PlaceList = () => {
  const { region, district } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  const category = searchParams.get("category") || null;

  // ⭐ 현재 페이지
  const [page, setPage] = useState(1);

  const handleCategoryClick = (value) => {
    if (value === null) setSearchParams({});
    else setSearchParams({ category: value });
  };

  const {
    data = [],
    isLoading,
    isError,
  } = usePlacesByRegionQuery({
    regionCode: region,
    district,
    category,
  });

  // ✅ 카테고리/지역 변경 시 1페이지로 리셋 (UX 중요)
  useEffect(() => {
    setPage(1);
  }, [region, district, category]);

  // ✅ 혹시 placeId 중복 대비 (키 경고 방지)
  const uniquePlaces = useMemo(() => {
    return Array.from(new Map(data.map((p) => [p.placeId, p])).values());
  }, [data]);

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(uniquePlaces.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPlaces = uniquePlaces.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <HeaderLayout>
      {/* 상단 제목 영역 */}
      <div className="PlaceList_header">
        <button
          className="place_buttonPrev"
          onClick={() => nav(`/district/${region.toLowerCase()}`)}
        >
          이전으로
        </button>

        <h2 className="PlaceList_title">
          {region}/{district} {category || "전체"}
        </h2>
      </div>

      {/* 카테고리 버튼 영역 */}
      <div className="PlaceList_filters">
        {categoryData.map((cat) => (
          <CategoryButton
            key={cat.id}
            name={cat.name}
            isClicked={category === cat.apiValue}
            onClick={() => handleCategoryClick(cat.apiValue)}
          />
        ))}
      </div>

      {/* 리스트 영역 */}
      <div className="PlaceList_container">
        <div className="PlaceList_list">
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>에러 발생</p>}

          {!isLoading && !isError && uniquePlaces.length === 0 ? (
            <p className="PlaceList_empty">데이터 없음</p>
          ) : (
            currentPlaces.map((place) => (
              <PlaceCard
                key={place.placeId}
                image={place.imageUrl}
                title={place.name}
                onClick={() => nav(`/places/${place.placeId}`)} // ✅ 보통 상세는 /places/:id
              />
            ))
          )}
        </div>

        {/* ✅ 페이지네이션 */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="PlaceList_pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              이전
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  className={`page-number ${page === p ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            })}

            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </HeaderLayout>
  );
};

export default PlaceList;
