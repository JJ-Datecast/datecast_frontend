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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleModalConfirm = () => {
    setShowModal(false);
    nav("/login");
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
