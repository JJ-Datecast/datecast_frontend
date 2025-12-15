import "../css/MypageSidebar.css";
import editIcon from "../../../assets/mypage/editIcon.png";
import { sidebarIcon } from "../../../util/get-sidebarIcon";
import { useRef } from "react";
import apiClient from "../../../networks/apis/axios";
import { useProfileStore } from "../../../store/profileStore";

const MyPageSidebar = ({ activeMenu, onMenuSelect, isCoupleConnected }) => {
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

      useProfileStore.getState().setProfileFromServer({
        profileImageUrl: base64Image,
      });

      try {
        const res = await apiClient.patch("/api/users/me", {
          profileImageUrl: base64Image,
        });
        useProfileStore.getState().setProfileFromServer(res.data);
      } catch (err) {
        console.error("이미지 업데이트 실패", err);
        alert("이미지 업데이트 실패");
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
          <img src={editIcon} style={{ width: "18px" }} />
        </button>

        <h3 className="profile-name">{nickname}</h3>
      </div>

      <nav className="sidebar-menu">
        <ul>
          {sidebarIcon.map((section) => {
            // ⭐ 커플 미연결 시 데이트 후기 제거
            const filteredItems = section.items.filter((item) => {
              if (item.key === "coupleReview" && !isCoupleConnected) {
                return false;
              }
              return true;
            });

            // 아이템이 하나도 없으면 섹션 자체를 숨김 (선택)
            if (filteredItems.length === 0) return null;

            return (
              <li key={section.title} className="menu-section">
                <div className="menu-title">
                  <div className="menu-icon-box">
                    <img src={section.icon} alt="" className="menu-icon" />
                  </div>
                  <span>{section.title}</span>
                </div>

                <ul>
                  {filteredItems.map((item) => (
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
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default MyPageSidebar;
