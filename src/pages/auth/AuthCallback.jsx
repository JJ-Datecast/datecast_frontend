import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";
import {
  useCoupleInvitationAccept,
  useCoupleMe,
} from "../../networks/hooks/useCouple";

const AuthCallback = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  const setProfile = useProfileStore((s) => s.setProfileFromServer);

  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();
  const { refetch: refetchCouple } = useCoupleMe();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(params.entries());

    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    const inviteTokenFromUrl = paramsObj.inviteToken || null;
    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    const finalInvitationToken =
      inviteTokenFromUrl || pendingInviteToken || null;

    const runFlow = async () => {
      console.log("🔐 AuthCallback 실행됨!");

      /** 토큰 저장 */
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🔥 accessToken 저장 완료");
      }

      /** 로그인 체크 */
      let user;
      try {
        user = await getUserMe();
        console.log("🟢 getUserMe 성공 → user:", user);
        qc.setQueryData(["userMe"], user);
        setProfile(user);

        if (!inviteTokenFromUrl && pendingInviteToken) {
          alert("❤️ 커플이 연결이 완료되었습니다!");
          localStorage.removeItem("inviteTokenPending");
        }
      } catch (err) {
        console.log("🔴 사용자 정보 조회 실패 → 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      /** 초대 토큰이 실제 있는 경우 */
      if (finalInvitationToken) {
        console.log("🏹 초대 토큰 확인됨 →", finalInvitationToken);

        try {
          await acceptInvitation({ token: finalInvitationToken });
          localStorage.removeItem("inviteTokenPending");

          alert("❤️ 커플이 연결되었습니다!");

          setTimeout(() => {
            nav("/accept-invite", {
              replace: true,
              state: { justAccepted: true },
            });
          }, 10);

          return;
        } catch (err) {
          const errorStatus = err?.response?.data?.status;
          console.log("❌ 초대 처리 실패 status:", errorStatus);

          localStorage.removeItem("inviteTokenPending");

          switch (errorStatus) {
            case "disconnected":
              alert("잘못된 초대 링크예요! 다시 요청해주세요 🥲");
              break;
            case "expired":
              alert("초대 링크가 만료되었어요! 다시 초대를 요청해주세요 ⏰");
              break;
            case "alreadyAccepted":
              alert("이미 커플이 연결된 상태예요 ❤️");
              break;
            default:
              alert("초대 처리 중 오류가 발생했어요! 다시 시도해주세요.");
          }

          setTimeout(() => {
            nav("/accept-invite", {
              replace: true,
              state: { justAccepted: false },
            });
          }, 10);

          return;
        }
      }

      /** 초대 없이 로그인한 경우 */
      console.log("✨ 초대 없이 로그인 완료 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
