import logo from "../../../assets/header/logo.png";
import sidebarBtn from "../../../assets/header/sidebarButton.png";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import InitialButton from "../../../shared/components/InitialButton";
import { useProfileStore } from "../../../store/profileStore";
import SideBar from "../../../features/main/components/SideBar";
import { useState } from "react";

const Header = ({
  isLoggedIn,
  showSidebar,
  onSidebarClick,
  onRequireLogin,
}) => {
  const nav = useNavigate();
  const { profileImageUrl } = useProfileStore();
  const [keyword, setKeyword] = useState("");
  const [isComposing, setIsComposing] = useState(false); // ⭐ 추가

  const handleSearch = () => {
    if (!keyword.trim()) return;
    nav(`/search?keyword=${encodeURIComponent(keyword)}`);
    setKeyword("");
  };

  return (
    <header className="Header">
      {/* 왼쪽 */}
      <div className="header_left">
        <img src={logo} onClick={() => nav("/")} />
      </div>

      {/* ⭐ 가운데 검색창 */}
      <div className="header_center">
        <input
          className="header_search_input"
          placeholder="장소를 검색해 보세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          // ⭐ 한글 조합 처리
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            setKeyword(e.target.value);
          }}
          // ⭐ 조합 중엔 Enter 무시
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              handleSearch();
            }
          }}
        />
        <button className="header_search_btn" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {/* 오른쪽 */}
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

        <div className="header_right_right">
          <img src={sidebarBtn} onClick={onSidebarClick} />

          {showSidebar && (
            <SideBar isLoggedIn={isLoggedIn} onRequireLogin={onRequireLogin} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
