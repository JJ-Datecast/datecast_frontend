import "../../shared/css/Main.css";
import RegionCard from "../../shared/\bcomponents/RegionCard";
import region from "../../util/get-regionCard";
import PromoBannerList from "../../shared/\bcomponents/PromoBannerList";


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
                
            </div>
            <div className="main_foot">

            </div>
        </div>
       </>
    )
}
export default Main;