import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    // 0️⃣ URL에 초대 토큰이 아예 없을 때
    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/", { replace: true });
      return;
    }

    const run = async () => {
      try {
        console.log("🏹 초대 수락 요청 시작", token);
        await acceptInvitation({ token }); // 🔥 일단 시도

        console.log("🎉 초대 수락 성공 → accept-invite로 이동");
        navigate("/accept-invite", { replace: true });
      } catch (err: any) {
        console.error("커플 초대 수락 실패:", err);

        const status = err?.response?.status;

        // 🔥 인증 안 된 상태라면 → 로그인으로 보내면서 토큰 저장
        if (status === 401 || status === 403) {
          console.log("⚠️ 인증 안 된 상태 → 로그인으로 이동");
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        const msg =
          err?.response?.data?.message ||
          "초대 처리 중 문제가 발생했습니다. 이미 처리된 초대일 수 있어요.";

        alert(msg);
        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
