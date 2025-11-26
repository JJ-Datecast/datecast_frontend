import React, { useState, useEffect } from "react";
import "../css/MyInfo.css";
import { useProfileStore } from "../../../store/profileStore";

const MyInfo = () => {
  const email = useProfileStore((state) => state.email);
  const nickname = useProfileStore((state) => state.nickname);
  const updateNickname = useProfileStore((state) => state.updateNickname);

  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);

  // nickname이 바뀌면 입력 값도 맞춰주기
  useEffect(() => {
    setTempNickname(nickname);
  }, [nickname]);

  const handleSave = async () => {
    try {
      await updateNickname(tempNickname); // 🔥 이 순간 UI는 이미 바뀜
      setIsEditing(false);
    } catch (err) {
      alert("닉네임 수정 실패");
    }
  };

  return (
    <div className="myinfo">
      <div className="info-row">
        <span className="info-label">이메일</span>
        <span className="info-value">{email}</span>
      </div>

      <div className="info-row">
        <span className="info-label">이름</span>
        <span className="info-value">{nickname}</span>
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
