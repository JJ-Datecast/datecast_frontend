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

    console.log("paramsObj 👉", paramsObj);

    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    const runFlow = async () => {
      console.log("🔐 AuthCallback 진입");

      // ⚡ 로그인 토큰 저장
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🌟 로그인 토큰 저장 완료");
      }

      // 🔥 로그인 여부 검증은 이것만 맞음
      let user = null;
      try {
        user = await getUserMe();
        console.log("👤 로그인 사용자 확인 성공:", user);

        qc.setQueryData(["userMe"], user);
        setProfile(user);
      } catch (err) {
        console.log("❌ 유저 인증 실패 → 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      // 🔥 초대 자동 수락
      if (pendingInviteToken) {
        console.log("🏹 초대 토큰 발견 → 자동 수락 시작");

        try {
          await acceptInvitation({ token: pendingInviteToken });

          console.log("🎉 초대 자동 수락 성공 → waiting-connect 이동");

          localStorage.removeItem("inviteTokenPending");
          nav("/waiting-connect", { replace: true });
          return;
        } catch (err) {
          console.log("❌ 자동 수락 실패 → 홈 이동");
          localStorage.removeItem("inviteTokenPending");
          nav("/", { replace: true });
          return;
        }
      }

      // 🔥 초대 없음 → 홈 이동
      console.log("✨ 정상 로그인 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
