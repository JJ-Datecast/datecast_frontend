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

    /** URL에서 온 초대 토큰 */
    const inviteTokenFromUrl = paramsObj.inviteToken || null;

    /** 로그인 전 저장된 초대 토큰 */
    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    /** 최종 확정되는 초대 토큰 */
    const finalInvitationToken =
      inviteTokenFromUrl || pendingInviteToken || null;

    const runFlow = async () => {
      console.log("🔐 AuthCallback 실행됨!");

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
      } catch (err) {
        console.log("🔴 user 정보 조회 실패 → 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      /** 초대 토큰 최종 실행 */
      if (finalInvitationToken) {
        console.log("🏹 초대 토큰 확인됨 →", finalInvitationToken);

        try {
          await acceptInvitation({ token: finalInvitationToken });
          localStorage.removeItem("inviteTokenPending");

          alert("❤️ 커플이 연결되었습니다!");
          nav("/waiting-connect", { replace: true });
          return;
        } catch (err) {
          alert("이미 처리되었거나 유효하지 않은 초대입니다.");
          localStorage.removeItem("inviteTokenPending");
          nav("/", { replace: true });
          return;
        }
      }

      console.log("✨ 초대 없이 로그인 완료 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
