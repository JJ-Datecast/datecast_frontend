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

    // 1️⃣ URL로 전달될 수도 있고 아닐 수도 있음
    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    // 2️⃣ 로컬스토리지 토큰도 확인
    const storedToken = localStorage.getItem("accessToken");

    // 3️⃣ 최종 사용할 토큰 결정
    const finalAccessToken = accessTokenFromUrl || storedToken;

    // 초대 토큰 처리
    const inviteTokenFromUrl =
      paramsObj.inviteToken || paramsObj.pendingInviteToken || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    const inviteToken = inviteTokenFromUrl || pendingInviteToken || null;

    const runAuthFlow = async () => {
      try {
        console.log("🔐 AuthCallback 진입");
        console.log("▶ finalAccessToken =", finalAccessToken);
        console.log("▶ inviteToken =", inviteToken);

        // 🔥 진짜 로그인 안 된 상태
        if (!finalAccessToken) {
          console.log("❌ accessToken 없음 → 로그인 페이지로 이동");
          nav("/login", { replace: true });
          return;
        }

        // 🔥 URL에서 새 token이 왔으면 새로 저장
        if (accessTokenFromUrl) {
          localStorage.setItem("accessToken", accessTokenFromUrl);
          console.log("🌟 URL에서 받은 token 저장 완료");
        }

        // 🔥 기존 토큰 사용
        console.log("🌟 finalAccessToken 사용 중");

        // 3️⃣ 내 정보 조회
        const user = await getUserMe();
        console.log("👤 getUserMe 성공:", user);
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 초대 자동 수락
        if (inviteToken) {
          try {
            console.log("🏹 초대 토큰 발견 → 자동 수락 시작", inviteToken);

            await acceptInvitation({ token: inviteToken });
            localStorage.removeItem("inviteTokenPending");

            console.log("🎉 초대 자동 수락 성공 → waiting-connect 이동");
            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("❌ 자동 초대 수락 실패:", err);
            localStorage.removeItem("inviteTokenPending");
            nav("/", { replace: true });
            return;
          }
        }

        console.log("✨ 초대 없이 로그인 → 홈으로 이동");
        nav("/", { replace: true });
      } catch (err) {
        console.error("❌ AuthCallback 처리 중 에러:", err);
        nav("/login", { replace: true });
      }
    };

    runAuthFlow();
  }, [nav, qc, setProfileFromServer, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
