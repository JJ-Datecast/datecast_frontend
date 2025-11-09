import googleLogo from "../../../assets/logo/googleLogo.png";
import "../css/LoginButton.css";
const LoginButton = ({ onClick }) => {
  return (
    <button className="LoginButton" onClick={onClick}>
      <img src={googleLogo} />
      <h4> 구글로 시작하기</h4>
    </button>
  );
};
export default LoginButton;
