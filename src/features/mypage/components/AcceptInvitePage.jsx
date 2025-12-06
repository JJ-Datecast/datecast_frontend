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

        // 수락 상태 기록
        localStorage.setItem("invitationAccepted", "true");
        localStorage.setItem("inviteTokenPending", token);

        // 여기서는 navigate만 함
        navigate("/accept-invite", {
          replace: true,
          state: { acceptSuccess: true },
        });
      } catch (err) {
        const status = err?.response?.status;

        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);

          // 로그인 후 다시 돌아오도록 redirect
          navigate("/login", {
            replace: true,
            state: { redirectTo: "/accept-invite" },
          });

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
