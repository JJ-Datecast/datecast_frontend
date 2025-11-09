import React from "react";
import "../css/CoupleConnect.css";
import emailIMG from "../../../assets/mypage/coupleEmailIcon.png";
import BigActionButton from "../../../shared/\bcomponents/BigActionButton";
import { useState } from "react";

const CoupleConnect = () => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    // 여기서 이메일 전송 로직 API 호출 등 실행
    console.log("보낼 이메일:", email);
  };
  return (
    <div className="couple-connect">
      <div className="couple-connect-top">
        <img
          src={emailIMG}
          alt="이메일 아이콘"
          className="couple-connect-icon"
        />
        <h3>상대의 이메일을 입력하세요.</h3>
        <input
          className="couple-connect-input"
          placeholder="abc1234@naver.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="couple-connect-bottom">
        <BigActionButton onClick={handleSend} children={"이메일 보내기"} />
      </div>
    </div>
  );
};

export default CoupleConnect;
