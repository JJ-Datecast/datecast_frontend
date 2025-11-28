import React from "react";
import "./District.css";
import RegionCard from "../../shared/components/RegionCard";
import { useParams, useNavigate } from "react-router-dom";
import {
  INCHEON_DISTRICTS,
  SEOUL_DISTRICTS,
  GYEONGGI_DISTRICTS,
} from "../../util/get-districts";

const District = () => {
  const { region } = useParams();
  const nav = useNavigate();

  const regionMap = {
    incheon: INCHEON_DISTRICTS,
    seoul: SEOUL_DISTRICTS,
    gyeonggi: GYEONGGI_DISTRICTS,
  };

  const districts = regionMap[region] || [];

  const handleClick = (d) => {
    nav(`/places/${d.regionCode}/${d.apiDistrict}`);
  };

  return (
    <div className="District_container">
      <div className="District_grid">
        {districts.map((d) => (
          <RegionCard
            key={d.id}
            name={d.name}
            img={d.img}
            type={"box"}
            onClick={() => handleClick(d)}
          />
        ))}
      </div>
    </div>
  );
};

export default District;
