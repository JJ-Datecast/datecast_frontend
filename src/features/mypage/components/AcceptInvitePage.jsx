import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);

    let token = params.get("token") || params.get("inviteToken");

    // Gmail 링크가 인코딩되어 올 경우
    if (!token) {
      const q = params.get("q");
      if (q && q.includes("token=")) {
        token = q.split("token=")[1];
      }
    }

    console.log("📌 초대 링크 접근 — 토큰 저장:", token);

    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/", { replace: true });
      return;
    }

    // 여기에서는 절대 accept API 호출하지 말기!!
    localStorage.setItem("inviteTokenPending", token);

    // 로그인으로 이동시키기
    navigate("/login");
  }, [search, navigate]);

  return <p>초대 처리 중...</p>;
};

export default AcceptInvitePage;
