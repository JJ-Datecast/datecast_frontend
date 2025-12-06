import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search, state } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    /** 이미 수락 완료 후 navigated 된 경우 */
    if (state?.acceptSuccess) {
      alert("❤️ 커플 연결되었습니다!");
      localStorage.removeItem("invitationAccepted");
      return;
    }

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

        navigate("/accept-invite", {
          replace: true,
          state: { acceptSuccess: true },
        });
      } catch (err) {
        const status = err?.response?.status;

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
  }, [search, state, navigate, acceptInvitation]);

  return <div>처리 중...</div>;
};

export default AcceptInvitePage;
