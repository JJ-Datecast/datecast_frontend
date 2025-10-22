import "../../shared/css/Main.css";
import RegionCard from "../../shared/\bcomponents/RegionCard";
import region from "../../util/get-regionCard";
import PromoBannerList from "../../shared/\bcomponents/PromoBannerList";
import PopularPlacesSection from "../../shared/\bcomponents/PopularPlacesSection";
import AllViewButton from "../../shared/\bcomponents/AllViewButton";
import MainFooter from "../../shared/\bcomponents/MainFooter";


const Main = () => {
    return(
       <>
        <div className="main">
            <div className="main_region">
                {region.map((row, rowIndex) => (
                    <div key={rowIndex} className="regionRow">
                        {row.map((region) => (
                            <RegionCard key={region.name} {...region}  />
                        ))}
                    </div>
                ))}
            </div>
            <div className="main_banner">
                <PromoBannerList/>
            </div>
            <div className="main_popularPlace">
                <PopularPlacesSection/>
                <p className="main_allViewBtn"><AllViewButton/></p>
            </div>
            <div className="main_foot">
                <MainFooter/>
            </div>
        </div>
       </>
    )
}
export default Main;