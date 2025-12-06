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
      alert("잘못된 초대입니다.");
      navigate("/", { replace: true });
      return;
    }

    const run = async () => {
      try {
        console.log("🏹 초대 수락 요청 시작", token);
        await acceptInvitation({ token });

        console.log("🎉 초대 수락 성공 → waiting-connect 이동");

        // ⭐⭐ 여기 추가 ⭐⭐
        alert("커플 등록이 완료되었습니다! 💕");

        localStorage.setItem("invitationAccepted", "true");

        navigate("/accept-invite", { replace: true });
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
  }, [search, navigate, acceptInvitation]);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
