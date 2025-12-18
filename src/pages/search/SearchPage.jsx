import { useSearchParams } from "react-router-dom";
import { useSearchPlacesQuery } from "../../networks/hooks/usePlace";
import PlaceCard from "../../shared/components/PlaceCard";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";
import HeaderLayout from "../../shared/layout/HeaderLayout";

const SearchPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim();
  const navigate = useNavigate();

  // keyword 없으면 쿼리 실행 안 됨 (hook에서 enabled 처리됨)
  const {
    data: places = [],
    isLoading,
    isError,
  } = useSearchPlacesQuery(keyword);

  if (!keyword) {
    return (
      <div className="search-page">
        <p className="search-empty">검색어를 입력해 주세요 🔍</p>
      </div>
    );
  }

  if (isLoading) {
    console.log("🔄 isLoading 상태", {
      keyword,
      isLoading,
    });

    return (
      <div className="search-page">
        <p className="search-loading">“{keyword}” 검색 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="search-page">
        <p className="search-error">검색 중 오류가 발생했어요 😢</p>
      </div>
    );
  }

  return (
    <>
      <HeaderLayout>
        <div className="search-page">
          <h2 className="search-title">“{keyword}” 검색 결과</h2>

          {places.length === 0 ? (
            <p className="search-empty">검색 결과가 없습니다 😢</p>
          ) : (
            <div className="place-list">
              {places.map((place) => (
                <PlaceCard
                  key={place.placeId}
                  image={place.imageUrl}
                  title={place.name}
                  url={`/places/${place.placeId}`}
                  onClick={() => navigate(`/places/${place.placeId}`)}
                />
              ))}
            </div>
          )}
        </div>
      </HeaderLayout>
    </>
  );
};

export default SearchPage;
