import { useState } from "react";
import MyPageSidebar from "../components/MypageSidebar";
import "../css/MyPageLayout.css";
import MyInfo from "../components/MyInfo";
import PreConnect from "../components/PreConnect";
import CoupleConnect from "../components/CoupleConnect";
import Review from "../components/Review";
import ReviewDetail from "../components/ReviewDetail";
import AfterConnect from "../components/AfterConnect"; // 💡 추가
import { useCoupleMe } from "../../../networks/hooks/useCouple"; // 💡 추가

const MyPageLayout = () => {
  const [activeMenu, setActiveMenu] = useState("basic");
  const [showConnect, setShowConnect] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // 💡 커플 상태 로드
  const { data, isLoading, error } = useCoupleMe();
  console.log("Couple Me Data:", data, "Error:", error);

  // 💡 커플 연결 여부 판단
  // getCoupleMe API 응답에 따라 수정 가능
  const isCoupleConnected = !!data?.coupleId;

  const titles = {
    basic: "기본 정보",
    status: isLoading
      ? "로딩 중..."
      : isCoupleConnected
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

        {activeMenu === "status" && (
          <>
            {isLoading && <div>로딩중...</div>}

            {!isLoading &&
              !isCoupleConnected &&
              (showConnect ? (
                <CoupleConnect />
              ) : (
                <PreConnect setShowConnect={setShowConnect} />
              ))}

            {!isLoading && isCoupleConnected && (
              <AfterConnect coupleData={data} /> // 💡 데이터도 넘길 수 있음
            )}
          </>
        )}

        {activeMenu === "review" && (
          <Review
            onSelectReview={(review) => {
              setSelectedReview(review);
              setActiveMenu("reviewDetail");
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
