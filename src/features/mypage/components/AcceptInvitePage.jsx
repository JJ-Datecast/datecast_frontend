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

        // 로그인 필요
        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        // 실패했기 때문에 현재 상태 확인해야 함
        try {
          const couple = await refetchCouple();
          const coupleData = couple?.data;

          /** 커플이 존재하면 */
          if (coupleData?.partner) {
            alert("이미 연결된 커플이에요! 💕");
            navigate("/", { replace: true });
            return;
          }

          /** 커플이 존재하지 않으면 */
          alert(
            "이 초대는 이미 만료되었어요! 상대방에게 새 초대를 요청해주세요 💌"
          );
          navigate("/", { replace: true });
          return;
        } catch (err2) {
          /** fallback */
          alert("유효하지 않은 초대입니다.");
          navigate("/", { replace: true });
          return;
        }
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <div>처리 중...</div>;
};

export default AcceptInvitePage;
