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
        console.log("❌ 초대 수락 실패:", status, err);

        // 1) 로그인 필요
        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        // 2) 초대 실패 → 커플 상태 확인
        try {
          const coupleResult = await refetchCouple();
          const coupleData = coupleResult?.data;

          console.log("👀 커플 상태 확인:", coupleData);

          const isCoupled =
            !!coupleData && !!coupleData.coupleId && !!coupleData.partnerId;

          if (isCoupled) {
            alert(
              `이미 연결된 커플이에요 ❤️\n상대방 닉네임: ${coupleData.partnerNickname}`
            );
            navigate("/", { replace: true });
            return;
          }

          alert(
            "이 초대는 이미 만료되었어요!\n상대방에게 새 초대를 요청해주세요 💌"
          );
          navigate("/", { replace: true });
          return;
        } catch (e) {
          alert("유효하지 않은 초대입니다.");
          navigate("/", { replace: true });
          return;
        }
      }
    };

    run();
  }, [search, navigate, acceptInvitation, refetchCouple]);

  return <div>처리 중...</div>;
};

export default AcceptInvitePage;
