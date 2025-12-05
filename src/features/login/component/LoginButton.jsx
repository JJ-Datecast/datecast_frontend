import googleLogo from "../../../assets/logo/googleLogo.png";
import "../css/LoginButton.css";

const LoginButton = () => {
  const handleGoogleLogin = () => {
    const currentOrigin = window.location.origin;
    const redirectPath = "/oauth/callback";

    // ⭐ 초대 토큰이 유효하면 가져오기
    const pendingToken = localStorage.getItem("inviteTokenPending");

    // ⭐ pendingToken을 쿼리에 붙여서 콜백으로 전달
    const redirectUrl = pendingToken
      ? `${currentOrigin}${redirectPath}?inviteToken=${pendingToken}`
      : `${currentOrigin}${redirectPath}`;

    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/oauth2/authorization/google?redirect_uri=${redirectUrl}`;
  };

  return (
    <button className="LoginButton" onClick={handleGoogleLogin}>
      <img src={googleLogo} alt="구글 로그인" />
      <h4>구글로 시작하기</h4>
    </button>
  );
};

export default LoginButton;
