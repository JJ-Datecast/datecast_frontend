import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/", { replace: true });
      return;
    }

    console.log("📌 초대 링크 접근 — 토큰 저장:", token);

    localStorage.setItem("inviteTokenPending", token);

    navigate("/login", { replace: true });
  }, [search, navigate]);

  return <p>초대 연결 준비 중...</p>;
};

export default AcceptInvitePage;
