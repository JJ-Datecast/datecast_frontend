import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";
import { useCoupleInvitationAccept } from "../../networks/hooks/useCouple";
import { getCoupleMe } from "../../networks/apis/coupleApi";

const AuthCallback = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  const setProfileFromServer = useProfileStore((s) => s.setProfileFromServer);
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token");
    const inviteToken = params.get("inviteToken");

    const runAuthFlow = async () => {
      try {
        // 1️⃣ accessToken 저장
        if (!accessToken) {
          nav("/login", { replace: true });
          return;
        }

        localStorage.setItem("accessToken", accessToken);

        // 2️⃣ 로그인 사용자 정보 요청
        const user = await getUserMe();
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 3️⃣ 커플 상태 확인
        let coupleInfo = null;
        try {
          coupleInfo = await getCoupleMe();
        } catch (err) {
          // 커플 없으면 여기로 떨어짐 → 정상
          coupleInfo = null;
        }

        if (coupleInfo?.coupleId) {
          // 이미 커플이 연결된 상태 → 초대 굳이 실행 X
          localStorage.removeItem("inviteTokenPending");
          nav("/", { replace: true });
          return;
        }

        // 4️⃣ 초대 토큰이 있다면 → 자동 accept
        if (inviteToken) {
          try {
            await acceptInvitation({ token: inviteToken });

            localStorage.removeItem("inviteTokenPending");

            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("자동 초대 수락 실패", err);
            nav("/", { replace: true });
            return;
          }
        }

        // 5️⃣ 정상 로그인 완료 → 메인 이동
        nav("/", { replace: true });
      } catch (err) {
        console.error("AuthCallback 처리 실패", err);
        nav("/login", { replace: true });
      }
    };

    runAuthFlow();
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
