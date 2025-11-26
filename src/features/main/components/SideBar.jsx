import "../css/SideBar.css";
import AuthButton from "../../login/component/AuthButton";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../../store/profileStore";
import { useLogout } from "../../../shared/hooks/useUser";

const SideBar = ({ isLoggedIn, onRequireLogin }) => {
  const nav = useNavigate();
  const { nickname } = useProfileStore();
  const { mutate: logout } = useLogout();

  const handleClick = (path) => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    nav(path);
  };

  return (
    <div className="SideBar">
      <div className="SideBar_AuthBtn">
        {isLoggedIn ? (
          <div className="welcome-text">
            어서오세요, <strong>{nickname}</strong>님!
          </div>
        ) : (
          <AuthButton onClick={() => nav("/login")} />
        )}
      </div>

      <div className="SideBar_content">
        <ul>
          <li onClick={() => handleClick("/calendarView")}>캘린더</li>
          <li onClick={() => handleClick("/mypageVIEW")}>마이페이지</li>
          <li onClick={() => handleClick("/profile")}>저장된 장소</li>
          <li>
            {isLoggedIn && (
              <button className="logout-button" onClick={() => logout()}>
                로그아웃
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
