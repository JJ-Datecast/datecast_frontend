import Header from "../\bcomponents/Header";
import { useState, useEffect } from "react";
import SideBar from "../\bcomponents/SideBar";
import AlterModal from "../\bcomponents/AlterModal";
import { useNavigate } from "react-router-dom";

const HeaderLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
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
    <>
      <Header
        isLoggedIn={false}
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
          onClick={() => handleModalConfirm()}
        />
      )}
      <main style={{ marginTop: "20px" }}>{children}</main>
    </>
  );
};

export default HeaderLayout;
