import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";
import { useCoupleInvitationAccept } from "../../networks/hooks/useCouple";

const AuthCallback = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  const setProfileFromServer = useProfileStore((s) => s.setProfileFromServer);
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(params.entries());

    // ⭐ 1) URL에서 올 수도 있고 아닐 수도 있는 token들 대응
    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    // ⭐ 2) 기존 로그인으로 저장된 localStorage 토큰
    const storedToken = localStorage.getItem("accessToken");

    // ⭐ 3) 최종 사용할 토큰
    const finalAccessToken = accessTokenFromUrl || storedToken;

    // ⭐ 초대 토큰 처리
    const inviteTokenFromUrl =
      paramsObj.inviteToken || paramsObj.pendingInviteToken || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    const inviteToken = inviteTokenFromUrl || pendingInviteToken || null;

    const runAuthFlow = async () => {
      try {
        console.log("🔐 AuthCallback 진입");
        console.log("finalAccessToken =", finalAccessToken);
        console.log("inviteToken =", inviteToken);

        // 🔥 로그인 상태가 아닌 경우에만 로그인으로 보냄
        if (!finalAccessToken) {
          console.log("❌ finalAccessToken 없음 → 로그인 이동");
          nav("/login", { replace: true });
          return;
        }

        // 🔥 URL로 새 토큰이 왔으면 갱신 저장
        if (accessTokenFromUrl) {
          localStorage.setItem("accessToken", accessTokenFromUrl);
          console.log("🌟 URL에서 받은 token 저장 완료");
        } else {
          console.log("🌟 기존 로그인된 token 사용");
        }

        // ⭐ 최종 토큰을 기반으로 내 정보 요청
        const user = await getUserMe();
        console.log("👤 getUserMe 성공:", user);

        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 초대 토큰이 존재하면 자동 수락 시도
        if (inviteToken) {
          try {
            console.log("🏹 초대 수락 시작:", inviteToken);

            await acceptInvitation({ token: inviteToken });

            localStorage.removeItem("inviteTokenPending");

            console.log("🎉 초대 자동 수락 성공 → 대기 페이지 이동");
            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("❌ 초대 수락 실패:", err);
            localStorage.removeItem("inviteTokenPending");
            nav("/", { replace: true });
            return;
          }
        }

        // ⭐ 초대 없이 로그인한 경우
        console.log("✨ 일반 로그인 → 홈 이동");
        nav("/", { replace: true });
      } catch (err) {
        console.error("❌ AuthCallback 처리중 오류:", err);
        nav("/login", { replace: true });
      }
    };

    runAuthFlow();
  }, [nav, qc, setProfileFromServer, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
