import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

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

        /**
         * 🎯 초대가 정상적으로 수락된 상태라고 표시
         * 👉 이후 자동 로그인 시에도 alert 유도 가능
         */
        localStorage.setItem("invitationAccepted", "true");
        localStorage.setItem("inviteTokenPending", token);

        navigate("/accept-invite", { replace: true });
      } catch (err) {
        const status = err?.response?.status;

        /**
         * 🔥 아직 로그인 안 된 상태에서 토큰 수락한 경우
         * -> 로그인을 강제하고
         * -> 로그인이 끝나면 다시 처리
         */
        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        alert("잘못된 초대입니다.");
        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <div>처리 중...</div>;
};

export default AcceptInvitePage;
