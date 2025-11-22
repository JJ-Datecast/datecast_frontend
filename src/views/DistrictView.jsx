import React from "react";
import HeaderLayout from "../shared/layout/HeaderLayout";
import District from "../pages/district/District";

const DistrictView = () => {
  return (
    <div>
      <HeaderLayout>
        <District />
      </HeaderLayout>
    </div>
  );
};

export default DistrictView;
