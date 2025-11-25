import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const nav = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      nav("/", { replace: true });
    } else {
      alert("로그인 실패: 토큰 없음");
      nav("/login");
    }
  }, [nav]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
