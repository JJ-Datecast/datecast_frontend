import "../css/PopularPlacesSection.css";
import CategoryBtn from "../../../shared/components/CategoryButton";
import category from "../../../util/get-categoryButton";
import { useState } from "react";
import PlaceCard from "../../../shared/components/PlaceCard";
import { usePopularPlacesQuery } from "../../../networks/hooks/usePlace";

const PopularPlacesSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

  const selectedCategory = category.find((c) => c.id === selectedCategoryId);
  const categoryParam = selectedCategory?.apiValue || null;

  const { data, isLoading, error } = usePopularPlacesQuery(categoryParam);

  return (
    <div className="PopularPlacesSection">
      <div className="PopularPlacesSection_header">
        <h2 className="PopularPlacesSection_title">많이 찾는 장소</h2>
        <p className="PopularPlacesSection_subTitle">
          최근 한 주간 많이 저장된 순
        </p>
      </div>

      <div className="PopularPlacesSection_filters">
        {category.map((item) => (
          <CategoryBtn
            key={item.id}
            name={item.name}
            isClicked={selectedCategoryId === item.id}
            onClick={() => setSelectedCategoryId(item.id)}
          />
        ))}
      </div>

      <div className="PopularPlacesSection_list">
        {isLoading && <p>불러오는 중...</p>}
        {error && <p>에러 발생!</p>}

        {data?.map((item) => (
          <PlaceCard
            key={item.placeId}
            image={item.imageUrl}
            title={item.name}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularPlacesSection;
