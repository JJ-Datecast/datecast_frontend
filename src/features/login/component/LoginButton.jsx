import googleLogo from "../../../assets/logo/googleLogo.png";
import "../css/LoginButton.css";

const LoginButton = () => {
  const handleGoogleLogin = () => {
    const currentOrigin = window.location.origin;
    const redirectPath = "/oauth/callback";

    // ⭐ 초대 토큰이 유효하면 가져오기
    const pendingToken = localStorage.getItem("inviteTokenPending");

    let redirectUrl = `${currentOrigin}${redirectPath}`;

    // ⭐ pendingToken 있을 경우 redirectUrl에 query 추가
    if (pendingToken) {
      redirectUrl = `${redirectUrl}?inviteToken=${pendingToken}`;
      // ⭐ 한 번 전달했으면 localStorage에서는 제거 (중복 처리 방지)
      localStorage.removeItem("inviteTokenPending");
    }

    const loginUrl = `${
      import.meta.env.VITE_API_URL
    }/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
      redirectUrl
    )}`;

    window.location.href = loginUrl;
  };

  return (
    <button className="LoginButton" onClick={handleGoogleLogin}>
      <img src={googleLogo} alt="구글 로그인" />
      <h4>구글로 시작하기</h4>
    </button>
  );
};

export default LoginButton;
