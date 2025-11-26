import "../css/MypageSidebar.css";
import editIcon from "../../../assets/mypage/editIcon.png";
import { sidebarIcon } from "../../../util/get-sidebarIcon";
import { useRef } from "react";
import apiClient from "../../../networks/apis/axios";
import { useProfileStore } from "../../../store/profileStore";

const MyPageSidebar = ({ activeMenu, onMenuSelect }) => {
  const fileInputRef = useRef(null);

  const profileImageUrl = useProfileStore((state) => state.profileImageUrl);
  const nickname = useProfileStore((state) => state.nickname);
  const setProfileFromServer = useProfileStore(
    (state) => state.setProfileFromServer
  );

  const handleEditClick = () => fileInputRef.current?.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      //  업로드하자마자 UI 즉시 반영
      useProfileStore.getState().setProfileFromServer({
        profileImageUrl: base64Image,
      });

      // 2️ 서버 반영
      try {
        const res = await apiClient.patch("/api/users/me", {
          profileImageUrl: base64Image,
        });

        // 3️ 서버 응답으로 최종 업데이트
        useProfileStore.getState().setProfileFromServer(res.data);
      } catch (err) {
        console.error("이미지 업데이트 실패", err);
        alert("이미지 업데이트 실패 (서버 500 오류)");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <aside className="mypage-sidebar">
      <div className="profile-section">
        <img
          src={profileImageUrl}
          key={profileImageUrl}
          alt="profile"
          className="profile-img"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <button className="edit-icon-btn" onClick={handleEditClick}>
          <img src={editIcon} style={{ width: "18px", paddingLeft: "1px" }} />
        </button>

        <h3 className="profile-name">{nickname}</h3>
      </div>

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

              {/*  중첩 li 문제 해결 */}
              <ul>
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
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MyPageSidebar;
