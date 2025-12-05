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
    let executed = false;
    if (executed) return;
    executed = true;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token");
    const inviteToken = params.get("inviteToken");

    const runAuthFlow = async () => {
      try {
        // 1️⃣ AccessToken 저장
        if (!accessToken) {
          nav("/login", { replace: true });
          return;
        }
        localStorage.setItem("accessToken", accessToken);

        // 2️⃣ 유저 정보 요청
        const user = await getUserMe();
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 3️⃣ 이미 커플 연결 완료 상태라면?
        if (user.isCoupleComplete) {
          // ⭐ 여기가 핵심: accept를 다시 호출하지 않음
          localStorage.removeItem("inviteTokenPending");
          nav("/", { replace: true });
          return;
        }

        // ⭐ 초대 토큰 처리
        if (inviteToken) {
          try {
            console.log("초대 토큰 발견 → 자동 수락 시작");
            await acceptInvitation({ token: inviteToken });

            // 성공적으로 소모된 토큰 제거
            localStorage.removeItem("inviteTokenPending");

            console.log("초대 자동 수락 완료 → waiting 이동");
            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("자동 초대 수락 실패:", err);
            // 실패해도 앱 사용은 가능해야함
          }
        }

        // 4️⃣ 일반 로그인 시 진입
        nav("/", { replace: true });
      } catch (err) {
        console.error("AuthCallback 처리 실패:", err);
        nav("/login", { replace: true });
      }
    };

    runAuthFlow();
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
