import logo from "../../../assets/header/logo.png";
import sidebarBtn from "../../../assets/header/sidebarButton.png";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import InitialButton from "../../../shared/components/InitialButton";
import { useProfileStore } from "../../../store/profileStore";

const Header = ({ isLoggedIn, onSidebarClick }) => {
  const nav = useNavigate();
  const { profileImage } = useProfileStore();
  return (
    <>
      <header className="Header">
        <div className="header_left">
          <img
            src={logo}
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
        <div className="header_right">
          <div className="header_right_left">
            {isLoggedIn ? (
              <img
                src={profileImage}
                alt="프로필 이미지"
                className="header-profile-img"
                style={{ width: "35px" }}
              />
            ) : (
              <InitialButton
                childern={"로그인/회원가입"}
                onClick={() => nav("/login")}
              />
            )}
          </div>
          <div className="header_right_right" onClick={onSidebarClick}>
            <img src={sidebarBtn} />
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
