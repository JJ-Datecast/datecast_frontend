import "../css/PopularPlacesSection.css";
import CategoryBtn from "./CategoryButton";
import category from "../../util/get-categoryButton";
import { useState } from "react";

const PopularPlacesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
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
                        isClicked={selectedCategory === item.name}
                        onClick={() => setSelectedCategory(item.name)}
                    />
                ))}
            </div>
            <div className="PopularPlacesSection_list">

            </div>
        </div>
    )
}
export default PopularPlacesSection;