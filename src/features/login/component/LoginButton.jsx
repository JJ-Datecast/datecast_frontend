import googleLogo from "../../../assets/logo/googleLogo.png";
import "../css/LoginButton.css";
const LoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://datecast.site/oauth2/authorization/google";
  };
  return (
    <button className="LoginButton" onClick={handleGoogleLogin}>
      <img src={googleLogo} />
      <h4> 구글로 시작하기</h4>
    </button>
  );
};
export default LoginButton;
