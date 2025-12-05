import React, { useState } from "react";
import "../css/CoupleConnect.css";
import emailIMG from "../../../assets/mypage/coupleEmailIcon.png";
import BigActionButton from "../../../shared/components/BigActionButton";
import { useCoupleInvitation } from "../../../networks/hooks/useCouple";

const CoupleConnect = () => {
  const [email, setEmail] = useState("");
  const { mutate: sendInvitation, isPending } = useCoupleInvitation();

  // 이메일 형식 검증 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSend = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    // API 호출
    sendInvitation(
      { inviteeEmail: email },
      {
        onSuccess: () => {
          alert("초대 이메일을 보냈습니다!");
        },
        onError: (err) => {
          alert("초대 전송에 실패했습니다.");
          console.error(err);
        },
      }
    );
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
          value={email}
        />
      </div>

      <div className="couple-connect-bottom">
        <BigActionButton onClick={handleSend} disabled={isPending}>
          {isPending ? "보내는 중..." : "이메일 보내기"}
        </BigActionButton>
      </div>
    </div>
  );
};

export default CoupleConnect;
