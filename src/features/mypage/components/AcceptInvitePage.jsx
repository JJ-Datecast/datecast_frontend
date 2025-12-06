import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";
import { apiClient } from "../../../networks/apiClient"; // couples/me 조회 위해 import

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

        localStorage.setItem("invitationAccepted", "true");

        // 🔍 커플 상태 확인
        let couple = null;
        try {
          const res = await apiClient.get("/api/couples/me");
          couple = res?.data;
        } catch (err) {
          // couples/me 자체가 404/500일 수 있으니 일단 무시 후 분기에서 처리
        }

        // ⚠️ 커플 관계가 실제로 없으면 (수락했지만 관계는 끊어진 상태)
        if (!couple) {
          alert(
            "초대는 수락되었지만 연결이 해제된 상태예요 🥲 다시 초대를 요청해주세요!"
          );
          navigate("/", { replace: true });
          return;
        }

        // 정상 연결일 때만 accept 페이지로 이동
        navigate("/accept-invite", { replace: true });
      } catch (err) {
        const status = err?.response?.status;

        if (status === 401 || status === 403) {
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        alert("이미 처리된 초대입니다! ❤️");
        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <div>처리 중…</div>;
};

export default AcceptInvitePage;
