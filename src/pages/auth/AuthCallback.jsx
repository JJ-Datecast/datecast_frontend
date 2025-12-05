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

    console.log("paramsObj 👉", paramsObj);

    /**
     * 1) URL에서 accessToken이 왔을 수도 있고 아닐 수도 있음
     */
    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    /**
     * 2) 로컬스토리지 기존 로그인 토큰
     */
    const storedToken = localStorage.getItem("accessToken");

    /**
     * 3) 초대 토큰 처리
     */
    const inviteTokenFromUrl =
      paramsObj.inviteToken || paramsObj.pendingInviteToken || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");
    const inviteToken = inviteTokenFromUrl || pendingInviteToken || null;

    const runAuthFlow = async () => {
      console.log("🔐 AuthCallback 진입");
      console.log("accessTokenFromUrl =", accessTokenFromUrl);
      console.log("storedToken =", storedToken);

      /**
       * 🔥 accessToken 저장 정책
       * 👉 URL로 왔으면 무조건 갱신 저장
       * 👉 없으면 기존 저장된 값 유지
       */
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🌟 URL token 저장 완료");
      }

      /**
       * 🚨 여기서 핵심 조건 변경
       * 기존에는 token 없으면 무조건 로그인 보내버렸지?
       * 이제 getUserMe() 성공 여부로 판단함
       */
      let user = null;

      try {
        user = await getUserMe(); // ⭐ 로그인 여부의 유일한 진실
        console.log("👤 getUserMe 성공:", user);

        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);
      } catch (err) {
        console.log("❌ getUserMe 실패 → 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      /**
       * 초대 토큰 있으면 바로 수락 요청
       */
      if (inviteToken) {
        try {
          console.log("🏹 초대 토큰 발견 → 자동 수락 실행", inviteToken);

          await acceptInvitation({ token: inviteToken });
          localStorage.removeItem("inviteTokenPending");

          console.log("🎉 초대 자동 수락 성공 → waiting-connect 이동");
          nav("/waiting-connect", { replace: true });
          return;
        } catch (err) {
          console.error("❌ 초대 수락 실패:", err);
          localStorage.removeItem("inviteTokenPending");

          // 로그인은 성공한 상태 → 홈으로 이동
          nav("/", { replace: true });
          return;
        }
      }

      /**
       * 정상 로그인 & 초대 없음
       */
      console.log("✨ 초대 없이 일반 로그인 → 홈 이동");
      nav("/", { replace: true });
    };

    runAuthFlow();
  }, [nav, qc, setProfileFromServer, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
