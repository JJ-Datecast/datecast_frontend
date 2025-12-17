import logo from "../../../assets/header/logo.png";
import sidebarBtn from "../../../assets/header/sidebarButton.png";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import InitialButton from "../../../shared/components/InitialButton";
import { useProfileStore } from "../../../store/profileStore";
import SideBar from "../../../features/main/components/SideBar";

const Header = ({
  isLoggedIn,
  showSidebar,
  onSidebarClick,
  onRequireLogin,
}) => {
  const nav = useNavigate();
  const { profileImageUrl } = useProfileStore();

  return (
    <header className="Header">
      <div className="header_left">
        <img src={logo} onClick={() => nav("/")} />
      </div>

      <div className="header_right">
        <div className="header_right_left">
          {isLoggedIn && profileImageUrl ? (
            <div className="profile-circle">
              <img src={profileImageUrl} />
            </div>
          ) : (
            <InitialButton
              childern={"로그인/회원가입"}
              onClick={() => nav("/login")}
            />
          )}
        </div>

        {/* 🔥 기준 부모 */}
        <div className="header_right_right">
          <img src={sidebarBtn} onClick={onSidebarClick} />

          {/* 🔥 여기서 렌더링 */}
          {showSidebar && (
            <SideBar isLoggedIn={isLoggedIn} onRequireLogin={onRequireLogin} />
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
