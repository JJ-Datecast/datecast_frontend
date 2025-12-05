import React from "react";
import "../css/AfterConnect.css";
import img from "../../../assets/mypage/profile.png";

const AfterConnect = () => {
  const handleBreakUp = () => {
    alert("커플이 끊어졌습니다! 😭");
  };

  return (
    <>
      <div className="after-wrap">
        <div className="profile-box">
          <img src={img} className="profile-img" alt="profile" />
          <p className="profile-text">정재현와이프</p>
        </div>

        <div className="heart">💗</div>

        <div className="profile-box">
          <img src={img} className="profile-img" alt="profile" />
          <p className="profile-text">정재현 여자친구</p>
        </div>
      </div>
      <div className="breakBtn-area">
        <button className="break-btn" onClick={handleBreakUp}>
          커플 끊기
        </button>
      </div>
    </>
  );
};

export default AfterConnect;
