import "./Main.css";
import RegionCard from "../../shared/\bcomponents/RegionCard";
import region from "../../util/get-regionCard";
import PromoBannerList from "../../features/main/components/PromoBannerList";
import PopularPlacesSection from "../../features/main/components/PopularPlacesSection";
import AllViewButton from "../../features/main/components/AllViewButton";
import MainFooter from "../../features/main/components/MainFooter";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const nav = useNavigate();
  const handleRegionClick = (name) => {
    const routeMap = {
      인천: "incheon",
      서울: "seoul",
      경기: "gyeonggi",
      강원: "gangwon",
      광주: "gwangju",
      대구: "daegu",
      대전: "daejeon",
      부산: "busan",
    };

    const regionKey = routeMap[name];

    if (regionKey) {
      nav(`/district/${regionKey}`);
    } else {
      alert(`${name} 지역은 아직 준비 중입니다!`);
    }
  };

  return (
    <>
      <div className="main_region">
        {region.map((row, rowIndex) => (
          <div key={rowIndex} className="regionRow">
            {row.map((region) => (
              <RegionCard
                key={region.name}
                {...region}
                onClick={() => handleRegionClick(region.name)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="main_banner">
        <PromoBannerList />
      </div>
      <div className="main_popularPlace">
        <PopularPlacesSection />
      </div>
      <div className="main_foot">
        <MainFooter />
      </div>
    </>
  );
};
export default Main;
