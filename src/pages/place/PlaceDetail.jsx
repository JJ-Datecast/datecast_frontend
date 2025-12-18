import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./PlaceDetail.css";
import { useProfileStore } from "../../store/profileStore";
import AlterModal from "../../shared/\bcomponents/AlterModal";
import {
  usePlaceDetailQuery,
  useSavePlaceMutation,
  useDeletePlaceMutation,
  useBookmarkedPlacesQuery,
} from "../../networks/hooks/usePlace";

import reviewIcon from "../../assets/place/reviewButton.png";
import beforeSave from "../../assets/place/beforeSave.png";
import afterSave from "../../assets/place/afterSave.png";
import locationIcon from "../../assets/mypage/locationIcon.png";

import HeaderLayout from "../../shared/layout/HeaderLayout";

const PlaceDetail = () => {
  const { placeId } = useParams();
  const nav = useNavigate();
  const location = useLocation();

  const from = location.state?.from; // "mypage" | undefined

  // 장소 상세 조회
  const { data, isLoading, isError } = usePlaceDetailQuery(placeId);

  // 북마크 목록 조회
  const bookmarkedQuery = useBookmarkedPlacesQuery();

  // 로컬 상태
  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null); // ← 북마크 ID 저장

  // 저장/삭제 Mutation
  const saveMutation = useSavePlaceMutation();
  const deleteMutation = useDeletePlaceMutation();

  const userId = useProfileStore((s) => s.userId);
  const isLoggedIn = !!userId;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!data || !bookmarkedQuery.data) return;

    console.log("📍 현재 상세 placeId:", placeId);
    console.log("📦 bookmarked 전체 데이터:", bookmarkedQuery.data);

    // ⭐ savedItem 매칭: 네이버 placeId 기준으로 비교
    const savedItem = bookmarkedQuery.data.find(
      (item) => String(item.placeId) === String(data.placeId)
    );

    console.log("🔎 savedItem 결과:", savedItem);

    if (savedItem) {
      setIsSaved(true);
      setBookmarkId(savedItem.bookmarkId); // ⭐ 정확한 bookmarkId 저장
    } else {
      setIsSaved(false);
      setBookmarkId(null);
    }
  }, [data, bookmarkedQuery.data, placeId]);

  /* -----------------------------
       저장 버튼 클릭
  ------------------------------ */
  const handleSaveClick = () => {
    // ⭐ 로그인 여부 확인 → 로그인 안 되어 있으면 모달 오픈
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (isSaved) {
      // ⭐ 삭제
      deleteMutation.mutate(bookmarkId, {
        onSuccess: () => {
          setIsSaved(false);
          setBookmarkId(null);
          bookmarkedQuery.refetch();
        },
      });
      return;
    }

    // ⭐ 저장 payload 구성
    const payload = {
      naverPlaceId: String(data.placeId),
      name: data.name,
      category: data.category,
      address: data.address,
      lat: Number(data.lat),
      lng: Number(data.lng),
      ...(data.phone && { phone: data.phone }),
      ...(data.url && { url: data.url }),
    };

    console.log("POST 요청 payload:", payload);

    saveMutation.mutate(payload, {
      onSuccess: (res) => {
        console.log("POST 성공:", res);

        // ⭐ 서버 응답에서 bookmarkId 받아서 상태 저장
        setIsSaved(true);
        setBookmarkId(res.bookmarkId);

        bookmarkedQuery.refetch();
      },
      onError: (error) => {
        console.log("❌ POST 실패");
        console.log("status:", error.response?.status);
        console.log("message:", error.response?.data);
      },
    });
  };
  const handleModalConfirm = () => {
    setShowModal(false);
  };
  const handleReviewClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    nav(`/places/${placeId}/review-waiting`);
  };

  if (isLoading || bookmarkedQuery.isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <HeaderLayout>
      <div className="placeDetail">
        <button
          className="placeDetailPrev_button"
          onClick={() => {
            if (from === "mypage") {
              nav("/mypageView", {
                state: { activeMenu: "place" },
              });
            } else if (from === "reviewWrite") {
              nav(`/`);
            } else {
              nav(-1); // 그 외 일반 케이스
            }
          }}
        >
          이전으로
        </button>

        <div className="placeDetail-content">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="PlaceDetail-image"
          />

          <div className="placeDetail-content-title-space">
            <div className="placeDetail-content-title-top">
              <div className="title-group">
                <h2 className="placeDetail-title">{data.name}</h2>
                <h3 className="placeDetail-category">{data.category}</h3>
              </div>

              <div className="placeDetail-button-space">
                <button onClick={() => nav(`/places/${placeId}/reviews`)}>
                  후기보기
                </button>
                <button
                  className="placeDetail-review-button"
                  onClick={handleReviewClick}
                >
                  <img src={reviewIcon} style={{ width: "25px" }} alt="" />
                </button>

                <button
                  className="placeDetail-save-button"
                  onClick={handleSaveClick}
                >
                  <img
                    src={isSaved ? afterSave : beforeSave}
                    alt="save"
                    style={{ width: "26px" }}
                  />
                </button>
              </div>
            </div>

            <div className="placeDetail-content-title-bottom">
              <img src={locationIcon} style={{ width: "23px" }} alt="" />
              <span>{data.address}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ⭐ 로그인 안내 모달 */}
      {showModal && (
        <AlterModal
          title="로그인이 필요한 서비스입니다."
          onClick={handleModalConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </HeaderLayout>
  );
};

export default PlaceDetail;
