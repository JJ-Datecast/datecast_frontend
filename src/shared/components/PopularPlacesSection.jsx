import "../css/PopularPlacesSection.css";
import CategoryBtn from "./CategoryButton";
import category from "../../util/get-categoryButton";
import { useState } from "react";
import PlaceCard from "./PlaceCard";
import mainCard from "../../util/get-placeCard";
const PopularPlacesSection = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    
    const filteredCards =
        selectedCategoryId === 1
            ? mainCard.filter((item) => item.categoryId === 1) 
            : mainCard.filter((item) => item.categoryId === selectedCategoryId);


    return(
        <div className="PopularPlacesSection">
            <div className="PopularPlacesSection_header">
                <h2 className="PopularPlacesSection_title">많이 찾는 장소</h2>
                <p className="PopularPlacesSection_subTitle">최근 한 주간 많이 저장된 순</p>
            </div>
            <div className="PopularPlacesSection_filters">
                {category.map((item)=>(
                    <CategoryBtn 
                        key={item.id} 
                        name={item.name}
                        isClicked={selectedCategoryId === item.id}
                        onClick={() => setSelectedCategoryId(item.id)}
                    />
                ))}
            </div>
            <div className="PopularPlacesSection_list">
            {filteredCards.map((item, index) => (
                <PlaceCard
                    key={index}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                     url={item.url}
            />
      ))}
            </div>
        </div>
    )
}
export default PopularPlacesSection;