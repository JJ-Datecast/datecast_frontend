import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const nav = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("token");
    console.log("Access Token:", accessToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      // 로그인 완료 → 메인 페이지 이동
      nav("/", { replace: true });
    } else {
      alert("로그인 실패: 토큰 없음");
      nav("/login");
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
