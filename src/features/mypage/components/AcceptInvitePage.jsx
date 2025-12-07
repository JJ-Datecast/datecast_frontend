import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";
import { apiClient } from "../../../networks/client/apiClient";

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

        let couple = null;
        try {
          const res = await apiClient.get("/api/couples/me");
          couple = res?.data;
        } catch (err) {
          couple = null;
        }

        if (!couple) {
          alert(
            "초대는 수락되었지만 연결이 해제된 상태예요 🥲 다시 초대를 요청해주세요!"
          );
          navigate("/", { replace: true });
          return;
        }

        navigate("/accept-invite", { replace: true });
      } catch (err) {
        const statusCode = err?.response?.status;
        const errorStatus = err?.response?.data?.status; // 여기!!

        /** 로그인 필요 케이스 */
        if (statusCode === 401 || statusCode === 403) {
          localStorage.setItem("inviteTokenPending", token);
          navigate("/login", { replace: true });
          return;
        }

        /** API에서 보내준 status를 기준으로 분기 */
        switch (errorStatus) {
          case "disconnected":
            alert("잘못된 초대 링크입니다 🥲 다시 공유받아주세요!");
            break;
          case "expired":
            alert("초대 링크가 만료되었어요 ⏰ 다시 요청해주세요!");
            break;
          case "alreadyAccepted":
            alert("이미 처리된 초대입니다 ❤️");
            break;
          default:
            alert("초대 처리 중 문제가 발생했어요. 다시 시도해주세요!");
            break;
        }

        navigate("/", { replace: true });
      }
    };

    run();
  }, [search, navigate, acceptInvitation]);

  return <div>처리 중…</div>;
};

export default AcceptInvitePage;
