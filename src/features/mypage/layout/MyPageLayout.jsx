import { useState } from "react";
import MyPageSidebar from "../components/MypageSidebar";
import "../css/MyPageLayout.css";
import MyInfo from "../components/MyInfo";
import PreConnect from "../components/PreConnect";
import CoupleConnect from "../components/CoupleConnect";
import Review from "../components/Review";
import ReviewDetail from "../components/ReviewDetail"; // import OK

const MyPageLayout = () => {
  const [activeMenu, setActiveMenu] = useState("basic");
  const isCoupleConnected = false;
  const [showConnect, setShowConnect] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const titles = {
    basic: "기본 정보",
    status: isCoupleConnected
      ? "커플 현황"
      : showConnect
      ? "커플 연결"
      : "커플 현황",
    review: "후기 보기",
    reviewDetail: "후기 상세보기",
    place: "장소 보기",
  };

  return (
    <div className="MyPageLayout">
      <div className="MyPageLayout_left">
        <MyPageSidebar
          activeMenu={activeMenu}
          onMenuSelect={(menu) => {
            setActiveMenu(menu);
            if (menu === "status") setShowConnect(false);
          }}
        />
      </div>

      <div className="MyPageLayout_right">
        <h3 className="MyPageLayout-title">{titles[activeMenu]}</h3>

        {activeMenu === "basic" && <MyInfo />}

        {activeMenu === "status" &&
          (isCoupleConnected ? (
            <h3>커플 연결된 화면</h3>
          ) : showConnect ? (
            <CoupleConnect />
          ) : (
            <PreConnect setShowConnect={setShowConnect} />
          ))}

        {activeMenu === "review" && (
          <Review
            onSelectReview={(review) => {
              setSelectedReview(review);
              setActiveMenu("reviewDetail"); // 상세 페이지로 이동
            }}
          />
        )}

        {activeMenu === "reviewDetail" && selectedReview && (
          <ReviewDetail
            review={selectedReview}
            onBack={() => {
              setActiveMenu("review");
              setSelectedReview(null);
            }}
          />
        )}

        {activeMenu === "place" && <div>장소 보기 화면</div>}
      </div>
    </div>
  );
};

export default MyPageLayout;
