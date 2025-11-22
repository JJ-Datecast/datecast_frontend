import React, { useState } from "react";
import "../css/MyInfo.css";
import { useProfileStore } from "../../../store/profileStore";

const MyInfo = () => {
  const { nickname, setNickname } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);

  const handleSave = () => {
    setNickname(tempNickname);
    setIsEditing(false);
  };

  return (
    <div className="myinfo">
      <div className="info-row">
        <span className="info-label">이메일</span>
        <span className="info-value">pulse@naver.com</span>
      </div>

      <div className="info-row">
        <span className="info-label">이름</span>
        <span className="info-value">김땡땡</span>
      </div>

      <div className="info-row">
        <span className="info-label">닉네임</span>

        <span className="info-value nickname">
          {isEditing ? (
            <>
              <input
                className="nickname-input"
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
              />
              <button className="info-btn" onClick={handleSave}>
                저장
              </button>
            </>
          ) : (
            <>
              {nickname}
              <button className="info-btn" onClick={() => setIsEditing(true)}>
                변경
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default MyInfo;
