import React from "react";
import "../css/AfterConnect.css";
import { useCoupleDelete } from "../../../networks/hooks/useCouple";
import { useProfileStore } from "../../../store/profileStore";

const AfterConnect = ({ coupleData }) => {
  const { profileImageUrl, nickname } = useProfileStore();
  const { mutate: deleteCouple } = useCoupleDelete();

  const handleBreakUp = () => {
    const confirmCheck = window.confirm("정말 커플을 해제하시겠습니까? 🥺");

    if (confirmCheck) {
      deleteCouple();
      alert("커플이 해제되었습니다. 😭");
      window.location.reload();
    }
  };

  return (
    <>
      <div className="after-wrap">
        <div className="profile-box">
          <img src={profileImageUrl} className="profile-img" alt="profile" />
          <p className="profile-text">{nickname}</p>
        </div>

        <div className="heart">💗</div>

        <div className="profile-box">
          <img
            src={coupleData?.partnerProfileImageUrl}
            className="profile-img"
            alt="profile"
          />
          <p className="profile-text">{coupleData?.partnerNickname}</p>
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
