import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCoupleInvitationAccept,
  useCoupleMe,
} from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();
  const { refetch: refetchCouple } = useCoupleMe();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const run = async () => {
      try {
        console.log("🏹 초대 수락 요청 시작", token);

        await acceptInvitation({ token });

        console.log("🎉 초대 수락 성공");

        localStorage.setItem("invitationAccepted", "true");

        navigate("/accept-invite", { replace: true });
        return;
      } catch (err) {
        const status = err?.response?.status;
        console.log("❌ 초대 수락 실패 status:", status, "err:", err);

        // 1) 로그인 필요한 경우
        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          alert("로그인이 필요합니다.");
          navigate("/login", { replace: true });
          return;
        }

        // 2) 그 외 실패 → 커플 상태 확인
        try {
          const coupleResult = await refetchCouple();
          console.log("👀 refetchCouple result:", coupleResult);

          // react-query + axios 모두 커버하기 위한 방어적 파싱
          const maybeAxios = coupleResult?.data ?? coupleResult;
          const payload = maybeAxios?.data ?? maybeAxios;

          const coupleId = payload && (payload.coupleId || payload.coupleID); // 혹시 대소문자 차이 대비
          const partnerId = payload && payload.partnerId;

          const isCoupled = !!coupleId && !!partnerId;

          console.log("👉 파싱된 커플 상태:", {
            coupleId,
            partnerId,
            isCoupled,
          });

          if (isCoupled) {
            alert("이미 처리된 초대입니다!\n현재 커플로 연결된 상태예요 ❤️");
            navigate("/", { replace: true });
            return;
          }

          // 커플이 아닌데 토큰은 이미 사용된 상태
          alert(
            "이 초대는 이미 만료되었어요!\n상대방에게 새 초대를 요청해주세요 💌"
          );
          navigate("/", { replace: true });
          return;
        } catch (err2) {
          console.log("🌀 커플 상태 조회 실패:", err2);
          alert(
            "세션이 만료되었거나 알 수 없는 오류가 발생했어요.\n다시 로그인 해주세요!"
          );
          navigate("/login", { replace: true });
          return;
        }
      }
    };

    run();
  }, [search, navigate, acceptInvitation, refetchCouple]);

  return <div>처리 중...</div>;
};

export default AcceptInvitePage;
