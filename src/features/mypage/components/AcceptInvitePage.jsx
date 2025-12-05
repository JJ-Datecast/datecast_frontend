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
      const accessToken = localStorage.getItem("accessToken");

      // 1️⃣ 로그인 안 된 상태 → 초대 토큰 저장하고 로그인으로
      if (!accessToken) {
        console.log("⚠️ accessToken 없음 → 로그인으로 이동");
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
        return;
      }

      // 2️⃣ 로그인 된 상태 → 바로 초대 수락 요청
      try {
        console.log("🏹 초대 수락 요청 시작", token);
        await acceptInvitation({ token });

        console.log("🎉 초대 수락 성공 → waiting-connect로 이동");
        navigate("/waiting-connect", { replace: true });
      } catch (err) {
        console.error("❌ 초대 수락 실패:", err);

        // 이미 처리된 초대 등일 수 있으니 일단 메인으로 돌려보내기
        alert(
          "초대 처리가 정상적으로 완료되지 않았습니다.\n이미 처리된 초대일 수 있어요."
        );
        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
