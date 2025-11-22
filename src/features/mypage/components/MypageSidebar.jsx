import "../css/MypageSidebar.css";
import editIcon from "../../../assets/mypage/editIcon.png";
import { sidebarIcon } from "../../../util/get-sidebarIcon";
import { useRef } from "react";
import { useProfileStore } from "../../../store/profileStore";

const MyPageSidebar = ({ activeMenu, onMenuSelect }) => {
  const fileInputRef = useRef(null);
  const { profileImage, nickname, setProfileImage } = useProfileStore();

  const handleEditClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <aside className="mypage-sidebar">
      <div className="profile-section">
        <img src={profileImage} alt="profile" className="profile-img" />

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
