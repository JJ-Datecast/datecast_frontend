import { useParams, useSearchParams } from "react-router-dom";
import { usePlacesByRegionQuery } from "../../networks/hooks/usePlace";
import categoryData from "../../util/get-categoryButton";
import CategoryButton from "../../shared/components/CategoryButton";
import HeaderLayout from "../../shared/layout/HeaderLayout";
import PlaceCard from "../../shared/components/PlaceCard";
import "./PlaceList.css";
import { useNavigate } from "react-router-dom";

const PlaceList = () => {
  const { region, district } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  const category = searchParams.get("category") || null;

  const handleCategoryClick = (value) => {
    if (value === null) {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const { data, isLoading, isError } = usePlacesByRegionQuery({
    regionCode: region,
    district,
    category,
  });

  return (
    <HeaderLayout>
      {/*  상단 제목 영역 */}
      <div className="PlaceList_header">
        <button
          className="place_buttonPrev"
          onClick={() => nav(`/district/${region.toLowerCase()}`)}
        >
          이전으로
        </button>
        <h2 className="PlaceList_title">
          {region}/{district} {category || "전체"} 목록
        </h2>
        <p className="PlaceList_subTitle">지역별 추천 장소 모아보기</p>
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
      <div class="PlaceList_container">
        <div className="PlaceList_list">
          {isLoading && <p>로딩 중...</p>}
          {isError && <p>에러 발생</p>}

          {data?.length === 0 ? (
            <p className="PlaceList_empty">데이터 없음</p>
          ) : (
            data?.map((place) => (
              <PlaceCard
                key={place.placeId}
                image={place.imageUrl}
                title={place.name}
                onClick={() => nav(`/place/${place.placeId}`)}
              />
            ))
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default PlaceList;
