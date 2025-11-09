import { useState } from "react";
import MyPageSidebar from "../components/MypageSidebar";
import "../css/MyPageLayout.css";
import MyInfo from "../components/MyInfo";
import PreConnect from "../components/PreConnect";
import CoupleConnect from "../components/CoupleConnect";

const MyPageLayout = () => {
  const [activeMenu, setActiveMenu] = useState("basic");
  const isCoupleConnected = false; // 나중에 API 결과로 대체
  const [showConnect, setShowConnect] = useState(false);

  const titles = {
    basic: "기본 정보",
    status: isCoupleConnected
      ? "커플 현황"
      : showConnect
      ? "커플 연결"
      : "커플 현황",
    review: "후기 보기",
    place: "장소 보기",
  };

  return (
    <div className="MyPageLayout">
      <div className="MyPageLayout_left">
        <MyPageSidebar
          activeMenu={activeMenu}
          onMenuSelect={(menu) => {
            setActiveMenu(menu);

            // 커플현황 클릭하면 항상 기본 화면으로 돌아오게
            if (menu === "status") {
              setShowConnect(false);
            }
          }}
        />
      </div>

      <div className="MyPageLayout_right">
        <h3 className="MyPageLayout-title">{titles[activeMenu]}</h3>

        {/* 기본 정보 */}
        {activeMenu === "basic" && <MyInfo />}

        {/*  커플 현황 */}
        {activeMenu === "status" &&
          (isCoupleConnected ? (
            <h3>커플 연결된 화면</h3>
          ) : showConnect ? (
            <CoupleConnect />
          ) : (
            <PreConnect setShowConnect={setShowConnect} />
          ))}

        {/* 후기 */}
        {activeMenu === "review" && <div>후기 보기 화면</div>}

        {/* 장소 */}
        {activeMenu === "place" && <div>장소 보기 화면</div>}
      </div>
    </div>
  );
};

export default MyPageLayout;
