import { useState } from "react";
import MyPageSidebar from "../components/MypageSidebar";
import "../css/MyPageLayout.css";
import MyInfo from "../components/MyInfo";
import PreConnect from "../components/PreConnect";
import CoupleConnect from "../components/CoupleConnect";
import Review from "../components/Review";
import ReviewDetail from "../components/ReviewDetail";
import AfterConnect from "../components/AfterConnect";
import { useCoupleMe } from "../../../networks/hooks/useCouple";
import SavedPlace from "../components/SavedPlace";
import DateReview from "../components/DateReview";
import DateReviewDetail from "../components/DateReviewDetail";

const MyPageLayout = () => {
  const [activeMenu, setActiveMenu] = useState("basic");
  const [showConnect, setShowConnect] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedDateReview, setSelectedDateReview] = useState(null);

  // 커플 상태 로드
  const { data, isLoading, error } = useCoupleMe();
  const coupleData = data?.data; // 실제 응답 데이터
  const isCoupleConnected = !!coupleData?.coupleId;
  console.log("Is Couple Connected:", isCoupleConnected);

  console.log("Couple Me Data:", data, "Error:", error);

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
    coupleReview: "데이트 후기",
    coupleReviewDetail: "데이트 후기 상세",
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
            {/* 로딩 중 */}
            {isLoading && <div>로딩중...</div>}

            {/* 연결된 상태 (최우선 조건) */}
            {!isLoading && isCoupleConnected && (
              <AfterConnect coupleData={coupleData} />
            )}

            {/* 연결 안 되어 있을 때 */}
            {!isLoading &&
              !isCoupleConnected &&
              (showConnect ? (
                <CoupleConnect />
              ) : (
                <PreConnect setShowConnect={setShowConnect} />
              ))}
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

        {activeMenu === "place" && (
          <div>
            <SavedPlace />
          </div>
        )}

        {activeMenu === "coupleReview" && (
          <DateReview
            onSelectReview={(review) => {
              setSelectedDateReview(review);
              setActiveMenu("coupleReviewDetail");
            }}
          />
        )}

        {activeMenu === "coupleReviewDetail" && selectedDateReview && (
          <DateReviewDetail
            review={selectedDateReview}
            onBack={() => {
              setActiveMenu("coupleReview");
              setSelectedDateReview(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageLayout;
