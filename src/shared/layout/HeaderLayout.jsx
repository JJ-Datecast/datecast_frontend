import Header from "../../features/header/components/Header";
import { useState, useEffect } from "react";
import SideBar from "../../features/main/components/SideBar";
import AlterModal from "../components/AlterModal";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../store/profileStore";
import { getUserMe } from "../../networks/apis/authApi";

const HeaderLayout = ({ children }) => {
  // Zustand 상태
  const userId = useProfileStore((s) => s.userId);
  const setProfileFromServer = useProfileStore((s) => s.setProfileFromServer);
  const isLoggedIn = !!userId;

  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();

  // 🔥 새로고침 시 userMe 자동 불러오기 (로그인 유지용)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return; // 로그인 안 된 상태면 무시

    getUserMe()
      .then((user) => {
        setProfileFromServer(user); // 로그인 정보 복구
      })
      .catch((err) => {
        console.error("userMe 오류:", err);
        localStorage.removeItem("accessToken");
      });
  }, []);

  // 모달 열릴 때 스크롤 막음
  useEffect(() => {
    if (showModal) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [showModal]);

  const handleModalConfirm = () => {
    setShowModal(false);
    nav("/");
  };

  return (
    <div className="HeaderLayout">
      <Header
        isLoggedIn={isLoggedIn}
        showSidebar={showSidebar}
        onSidebarClick={() => setShowSidebar(!showSidebar)}
        onRequireLogin={() => setShowModal(true)}
      />

      {showModal && (
        <AlterModal
          title="로그인 후 이용해주세요."
          onClick={handleModalConfirm}
        />
      )}

      <main className="HeaderLayout_content">{children}</main>
    </div>
  );
};

export default HeaderLayout;
