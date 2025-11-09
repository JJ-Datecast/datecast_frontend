import "../css/MypageSidebar.css";
import defaultProfileIMG from "../../../assets/mypage/defaultProfile.png";
import editIcon from "../../../assets/mypage/editIcon.png";
import { sidebarIcon } from "../../../util/get-sidebarIcon";
import { useEffect, useRef, useState } from "react";

const MyPageSidebar = ({ activeMenu, onMenuSelect }) => {
  const [profile, setProfile] = useState(defaultProfileIMG);
  const fileInputRef = useRef(null);

  // localStorage에서 저장된 이미지 불러오기
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfile(savedImage);
    }
  }, []);

  // 프로필 편집 버튼 클릭 → 파일 선택창 열기
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 → 이미지 설정 및 저장
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      //  미리보기 적용
      setProfile(base64);

      //  localStorage 저장 → 다음 접속에도 유지
      localStorage.setItem("profileImage", base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <aside className="mypage-sidebar">
      {/* 프로필 */}
      <div className="profile-section">
        <img src={profile} alt="profile" className="profile-img" />

        {/* 숨겨진 파일 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* 이미지 오른쪽 아래 동그란 편집 버튼 */}
        <button
          className="edit-icon-btn"
          type="button"
          onClick={handleEditClick}
        >
          <img src={editIcon} style={{ width: "18px", paddingLeft: "1PX" }} />
        </button>

        <h3 className="profile-name">나는야 김땡땡</h3>
      </div>

      {/* 사이드바 메뉴 */}
      <nav className="sidebar-menu">
        <ul>
          {sidebarIcon.map((section) => (
            <li key={section.title} className="menu-section">
              <div className="menu-title">
                <div className="menu-icon-box">
                  <img src={section.icon} alt="" className="menu-icon" />
                </div>
                <span>{section.title}</span>
              </div>

              {section.items.map((item) => (
                <li
                  key={item.key}
                  className={`menu-item ${
                    activeMenu === item.key ? "active" : ""
                  }`}
                  onClick={() => onMenuSelect(item.key)}
                >
                  {item.label}
                </li>
              ))}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MyPageSidebar;
