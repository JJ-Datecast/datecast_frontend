import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyReviewMutation } from "../../../networks/hooks/useReview";

const ReviewWaiting = () => {
  const nav = useNavigate();
  const { placeId } = useParams();

  const verifyMutation = useVerifyReviewMutation();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("GPS 기능을 지원하지 않는 브라우저입니다.");
      nav(-1);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const payload = {
          placeId: Number(placeId),
          currentLatitude: latitude,
          currentLongitude: longitude,
        };

        verifyMutation.mutate(payload, {
          onSuccess: () => {
            console.log("GPS 인증 성공!");
            // ⭐ 위도경도 전달 필요 없음
            nav(`/places/${placeId}/review/write`);
          },
          onError: () => {
            alert("300m 이내에서만 후기를 작성할 수 있습니다.");
            nav(-1);
          },
        });
      },
      () => {
        alert("GPS를 가져올 수 없습니다.");
        nav(-1);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [placeId]);

  return (
    <div>
      <p>방문 인증 중입니다...</p>
      <p>GPS 확인 중입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};

export default ReviewWaiting;
