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
        console.log("❌ 초대 수락 실패:", status);

        // 1) 로그인 필요한 경우
        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          alert("로그인이 필요합니다.");
          navigate("/login", { replace: true });
          return;
        }

        // 2) 커플 상태 확인
        try {
          const coupleResult = await refetchCouple();
          const coupleData = coupleResult?.data;

          const isCoupled =
            coupleData && coupleData.coupleId && coupleData.partnerId;

          if (isCoupled) {
            alert(
              "이미 처리된 초대입니다!\n현재 커플 상태로 잘 연결되어 있어요 ❤️"
            );
            navigate("/", { replace: true });
            return;
          }

          alert(
            "이 초대는 이미 만료되었어요!\n상대방에게 새 초대를 요청해주세요 💌"
          );
          navigate("/", { replace: true });
          return;
        } catch (err2) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요!");
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
