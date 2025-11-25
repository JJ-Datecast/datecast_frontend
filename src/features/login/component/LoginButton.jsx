import googleLogo from "../../../assets/logo/googleLogo.png";
import "../css/LoginButton.css";

const LoginButton = () => {
  const handleGoogleLogin = () => {
    const currentOrigin = window.location.origin;
    const redirectPath = "/oauth/callback";

    window.location.href = `${
      import.meta.env.VITE_API_URL
    }/oauth2/authorization/google?redirect_uri=${currentOrigin}${redirectPath}`;
  };

  return (
    <button className="LoginButton" onClick={handleGoogleLogin}>
      <img src={googleLogo} alt="구글 로그인" />
      <h4>구글로 시작하기</h4>
    </button>
  );
};

export default LoginButton;
