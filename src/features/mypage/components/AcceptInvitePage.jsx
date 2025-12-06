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
        navigate("/waiting-connect", { replace: true });
      } catch (err) {
        const status = err?.response?.status;
        console.error("커플 초대 수락 실패:", status);

        // 🔥 로그인 필요 상태
        if (status === 401 || status === 403) {
          console.log("⚠️ 인증 안 된 상태 → 로그인으로 이동");

          // 🔥 로그인 후 자동 처리하도록 로컬에 저장
          localStorage.setItem("inviteTokenPending", token);

          navigate("/login", { replace: true });
          return;
        }

        alert("초대 처리 중 문제가 발생했습니다.");
        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <p>초대 처리 중...</p>;
};

export default AcceptInvitePage;
