import "./Main.css";
import RegionCard from "../../shared/\bcomponents/RegionCard";
import region from "../../util/get-regionCard";
import PromoBannerList from "../../features/main/components/PromoBannerList";
import PopularPlacesSection from "../../features/main/components/PopularPlacesSection";
import AllViewButton from "../../features/main/components/AllViewButton";
import MainFooter from "../../features/main/components/MainFooter";

const Main = () => {
  return (
    <>
      <div className="main">
        <div className="main_region">
          {region.map((row, rowIndex) => (
            <div key={rowIndex} className="regionRow">
              {row.map((region) => (
                <RegionCard key={region.name} {...region} />
              ))}
            </div>
          ))}
        </div>
        <div className="main_banner">
          <PromoBannerList />
        </div>
        <div className="main_popularPlace">
          <PopularPlacesSection />
          <p className="main_allViewBtn">
            <AllViewButton />
          </p>
        </div>
        <div className="main_foot">
          <MainFooter />
        </div>
      </div>
    </>
  );
};
export default Main;
