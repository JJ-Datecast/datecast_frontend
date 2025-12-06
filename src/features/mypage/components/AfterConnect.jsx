import React from "react";
import "../css/AfterConnect.css";
import img from "../../../assets/mypage/profile.png";
import img2 from "../../../assets/mypage/reviewIcon.png";
import { useCoupleDelete } from "../../../networks/hooks/useCouple";

const AfterConnect = ({ coupleData }) => {
  const { partnerNickname } = coupleData || {};
  const { mutate: deleteCouple } = useCoupleDelete();
  const handleBreakUp = () => {
    const confirmCheck = window.confirm("정말 커플을 해제하시겠습니까? 🥺");

    if (confirmCheck) {
      deleteCouple(); // 실제 API 호출
      console.log("커플 해제 요청 보냄", coupleData);
      alert("커플이 해제되었습니다. 😭");
      window.location.reload(); // 🔥 강제 새로고침
    }
  };

  return (
    <>
      <div className="after-wrap">
        <div className="profile-box">
          <img src={img2} className="profile-img" alt="profile" />
          <p className="profile-text">정재현와이프</p>
        </div>

        <div className="heart">💗</div>

        <div className="profile-box">
          <img src={img} className="profile-img" alt="profile" />
          <p className="profile-text">{partnerNickname}</p>
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
