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

    console.log("paramsObj 👉", paramsObj);

    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    /** URL에서 전달된 초대 토큰 */
    const inviteTokenFromUrl = paramsObj.inviteToken || null;

    /** 로그인 전에 저장되어있던 초대 토큰 */
    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    /** 최종적으로 사용할 초대 토큰 */
    const finalInvitationToken =
      inviteTokenFromUrl || pendingInviteToken || null;

    const runFlow = async () => {
      console.log("🔐 AuthCallback 실행됨!");

      /** URL로 accessToken 전달 된 경우 로컬에 저장 */
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🔥 accessToken 저장 완료");
      }

      let user;
      try {
        user = await getUserMe();
        console.log("🟢 getUserMe 성공 → user:", user);

        qc.setQueryData(["userMe"], user);
        setProfile(user);

        /**
         *
         * [💡 핵심 로직]
         * URL에 token이 없고
         * 로컬에는 이전에 초대 토큰이 남아있는 상태라면
         *
         * → 자동 로그인된 상태에서 초대가 이미 처리된 것으로 판단
         */
        if (!inviteTokenFromUrl && pendingInviteToken) {
          alert("❤️ 커플이 연결이 완료되었습니다!");
          localStorage.removeItem("inviteTokenPending");
        }
      } catch (err) {
        console.log("🔴 사용자 정보 조회 실패 → 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      /** 초대 토큰이 있는 경우 → 실제 처리 */
      if (finalInvitationToken) {
        console.log("🏹 초대 토큰 확인됨 →", finalInvitationToken);
        alert("❤️ 커플이 연결되었습니다!");

        try {
          await acceptInvitation({ token: finalInvitationToken });
          localStorage.removeItem("inviteTokenPending");

          alert("❤️ 커플이 연결되었습니다!");
          nav("/accept-invite", { replace: true });
          return;
        } catch (err) {
          alert("❤️ 이미 초대가 처리된 상태입니다!");
          localStorage.removeItem("inviteTokenPending");

          nav("/accept-invite", { replace: true });
          return;
        }
      }

      /** 초대 없는 일반 로그인 */
      console.log("✨ 초대 없이 로그인 완료 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
