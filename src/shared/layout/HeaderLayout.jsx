import Header from "../../features/header/components/Header";
import { useState, useEffect } from "react";
import SideBar from "../../features/main/components/SideBar";
import AlterModal from "../\bcomponents/AlterModal";
import { useNavigate } from "react-router-dom";

const HeaderLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();

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
    nav("");
  };

  return (
    <div className="HeaderLayout">
      <Header
        isLoggedIn={isLoggedIn}
        onSidebarClick={() => setShowSidebar(!showSidebar)}
      />

      {showSidebar && (
        <SideBar
          isLoggedIn={isLoggedIn}
          onRequireLogin={() => setShowModal(true)}
        />
      )}

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
