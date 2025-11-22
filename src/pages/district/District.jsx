import React from "react";
import "./District.css";
import RegionCard from "../../shared/components/RegionCard";
import { useParams } from "react-router-dom";
import {
  INCHEON_DISTRICTS,
  SEOUL_DISTRICTS,
  GYEONGGI_DISTRICTS,
} from "../../util/get-districts";

const District = () => {
  const { region } = useParams();
  const regionMap = {
    incheon: INCHEON_DISTRICTS,
    seoul: SEOUL_DISTRICTS,
    gyeonggi: GYEONGGI_DISTRICTS,
    // 강원, 부산 등 필요하면 추가
  };
  const regions = regionMap[region] || [];

  return (
    <div className="District_container">
      <div className="District_grid">
        {regions.map((region) => (
          <RegionCard
            key={region.id}
            name={region.name}
            img={region.img}
            type={"box"}
            onClick={() => console.log(region.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default District;
