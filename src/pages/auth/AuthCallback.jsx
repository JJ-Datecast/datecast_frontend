import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";
import { useCoupleInvitationAccept } from "../../networks/hooks/useCouple";

const AuthCallback = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  const setProfile = useProfileStore((s) => s.setProfileFromServer);
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(params.entries());

    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");
    const inviteAlreadyAccepted = localStorage.getItem("invitationAccepted");

    const runFlow = async () => {
      console.log("🔐 AuthCallback 실행됨!");

      // 🔥 accessToken 저장
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🌟 accessToken 저장 완료");
      }

      // 로그인 확인
      try {
        const user = await getUserMe();
        console.log("👤 로그인 확인:", user);

        qc.setQueryData(["userMe"], user);
        setProfile(user);
      } catch (err) {
        nav("/login", { replace: true });
        return;
      }

      // ⛔ 이미 invite 처리됨 → 바로 페이지 이동
      if (inviteAlreadyAccepted) {
        console.log("🎯 초대는 이미 처리됨 → waiting-connect 이동");
        nav("/waiting-connect", { replace: true });
        return;
      }

      // 🔥 초대 수락이 pending 상태였다면 자동처리
      if (pendingInviteToken) {
        console.log("🏹 자동 초대 수락 실행");

        try {
          await acceptInvitation({ token: pendingInviteToken });

          console.log("🎉 자동 초대 수락 성공");
          localStorage.removeItem("inviteTokenPending");
          localStorage.setItem("invitationAccepted", "true");

          nav("/waiting-connect", { replace: true });
          return;
        } catch (err) {
          console.error("❌ 자동 수락 실패");
          localStorage.removeItem("inviteTokenPending");
          nav("/", { replace: true });
          return;
        }
      }

      console.log("✨ 초대 없이 로그인 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
