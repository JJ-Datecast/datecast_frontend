import "../css/SideBar.css";
import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isLoggedIn, onRequireLogin }) => {
  const nav = useNavigate();

  const handleClick = (path) => {
    if (!isLoggedIn) {
      // ✅ 로그인 안 되어있으면 모달 띄우기
      onRequireLogin();
      return;
    }
    // ✅ 로그인되어 있으면 바로 이동
    nav(path);
  };

  return (
    <div className="SideBar">
      <div className="SideBar_AuthBtn">
        <AuthButton onClick={() => nav("/login")} />
      </div>

      <div className="SideBar_content">
        <ul>
          <li onClick={() => handleClick("/calendarAddEvent")}>캘린더</li>
          <li onClick={() => handleClick("/profile")}>마이페이지</li>
          <li onClick={() => handleClick("/profile")}>저장된 장소</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
