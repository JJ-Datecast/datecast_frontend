import React, { useState } from "react";
import "../css/AfterConnect.css";
import { useCoupleDelete } from "../../../networks/hooks/useCouple";
import { useProfileStore } from "../../../store/profileStore";
import AlterModal from "../../../shared/components/AlterModal";

const AfterConnect = ({ coupleData }) => {
  const { profileImageUrl, nickname } = useProfileStore();
  const { mutate: deleteCouple } = useCoupleDelete();

  // ⭐ 모달 상태
  const [showBreakUpModal, setShowBreakUpModal] = useState(false);

  /* =========================
     커플 끊기 버튼 클릭
  ========================= */
  const handleBreakUpClick = () => {
    setShowBreakUpModal(true);
  };

  /* =========================
     모달 - 확인
  ========================= */
  const handleBreakUpConfirm = () => {
    deleteCouple(undefined, {
      onSuccess: (data) => {
        console.log("커플 해제 성공:", data);
        alert("커플이 해제되었습니다. 😭");
        setShowBreakUpModal(false);
        window.location.reload();
      },
      onError: (error) => {
        console.error("❌ 커플 해제 실패:", error);
        alert("커플 해제 중 오류가 발생했습니다.");
        setShowBreakUpModal(false);
      },
    });
  };

  /* =========================
     모달 - 취소
  ========================= */
  const handleBreakUpCancel = () => {
    setShowBreakUpModal(false);
  };

  return (
    <>
      {/* 커플 프로필 */}
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

      {/* 커플 끊기 버튼 */}
      <div className="breakBtn-area">
        <button className="break-btn" onClick={handleBreakUpClick}>
          커플 끊기
        </button>
      </div>

      {/* ⭐ 커플 해제 확인 모달 */}
      {showBreakUpModal && (
        <AlterModal
          title="커플을 해제하시겠습니까?"
          subTitle="⚠️ 커플을 해제하면 등록한 일정이 모두 삭제됩니다."
          onClick={handleBreakUpConfirm} // 확인
          onCancel={handleBreakUpCancel} // 취소
        />
      )}
    </>
  );
};

export default AfterConnect;
