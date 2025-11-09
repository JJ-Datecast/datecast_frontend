import "../css/Login.css";
import mainLogo from "../../assets/header/logo.png";
import LoginButton from "../../features/login/component/LoginButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  return (
    <div className="Login">
      <img src={mainLogo} className="Login_img" onClick={() => nav("/")} />
      <div className="Login_button">
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
