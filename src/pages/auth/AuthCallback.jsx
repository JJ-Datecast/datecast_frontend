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
    const accessTokenFromUrl = params.get("token"); // 구글 로그인 후 백엔드가 넘겨준 accessToken
    const inviteTokenFromUrl = params.get("inviteToken"); // redirect_uri에 같이 딸려온 초대 토큰
    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    // URL에 온 토큰이 우선, 없으면 localStorage에 저장된 초대 토큰 사용
    const inviteToken = inviteTokenFromUrl || pendingInviteToken || null;

    const runAuthFlow = async () => {
      try {
        console.log("🔐 AuthCallback 진입");
        console.log("URL accessToken:", accessTokenFromUrl);
        console.log("URL inviteToken:", inviteTokenFromUrl);
        console.log("localStorage pendingInviteToken:", pendingInviteToken);

        // 1️⃣ accessToken 없으면 로그인 실패로 간주
        if (!accessTokenFromUrl) {
          console.log("❌ accessToken 없음 → 로그인 페이지로 이동");
          nav("/login", { replace: true });
          return;
        }

        // 2️⃣ accessToken 저장
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("✅ accessToken 저장 완료");

        // 3️⃣ 내 정보 가져오기
        const user = await getUserMe();
        console.log("👤 getUserMe 성공:", user);
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 4️⃣ 초대 토큰 있으면 자동 수락 시도
        if (inviteToken) {
          try {
            console.log("🏹 초대 토큰 발견 → 자동 수락 시작", inviteToken);
            await acceptInvitation({ token: inviteToken });

            // 사용 완료 → pending 토큰 제거
            localStorage.removeItem("inviteTokenPending");

            console.log("🎉 초대 자동 수락 성공 → waiting-connect 이동");
            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("❌ 자동 초대 수락 실패:", err);
            // 실패해도 로그인은 된 상태 → 메인으로 보내기
            localStorage.removeItem("inviteTokenPending");
            nav("/", { replace: true });
            return;
          }
        }

        // 5️⃣ 초대 없는 일반 로그인 → 메인으로
        console.log("✨ 초대 없이 일반 로그인 → 홈 이동");
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
