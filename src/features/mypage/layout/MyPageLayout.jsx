import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyPageSidebar from "../components/MypageSidebar";
import "../css/MyPageLayout.css";
import MyInfo from "../components/MyInfo";
import PreConnect from "../components/PreConnect";
import CoupleConnect from "../components/CoupleConnect";
import Review from "../components/Review";
import AfterConnect from "../components/AfterConnect";
import { useCoupleMe } from "../../../networks/hooks/useCouple";
import SavedPlace from "../components/SavedPlace";
import DateReview from "../components/DateReview";

const MyPageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("basic");
  const [showConnect, setShowConnect] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  /* =========================
     location.state로 탭 복구
  ========================= */
  useEffect(() => {
    if (location.state?.activeMenu) {
      setActiveMenu(location.state.activeMenu);

      // ⭐ state 즉시 제거 (중요)
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.state, location.pathname, navigate]);

  /* =========================
     커플 상태
  ========================= */
  const { data, isLoading } = useCoupleMe();
  const coupleData = data?.data;
  const isCoupleConnected = !!coupleData?.coupleId;

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
    place: "장소 보기",
    coupleReview: "데이트 후기",
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

            {!isLoading && isCoupleConnected && (
              <AfterConnect coupleData={coupleData} />
            )}

            {!isLoading &&
              !isCoupleConnected &&
              (showConnect ? (
                <CoupleConnect />
              ) : (
                <PreConnect setShowConnect={setShowConnect} />
              ))}
          </>
        )}
        {activeMenu === "review" && <Review />}

        {activeMenu === "place" && <SavedPlace />}

        {activeMenu === "coupleReview" && <DateReview />}
      </div>
    </div>
  );
};

export default MyPageLayout;
