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

  // ⭐ 수락 API mutation
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    let isRun = false;
    if (isRun) return;
    isRun = true;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token");
    const inviteToken = params.get("inviteToken"); // ⭐ 여기서 토큰 받음

    const loginFlow = async () => {
      try {
        // 1️⃣ 토큰 저장
        localStorage.setItem("accessToken", accessToken);

        // 2️⃣ 사용자 정보 요청
        const user = await getUserMe();
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);

        // 3️⃣ 초대 토큰 존재하면 → 수락 처리
        if (inviteToken) {
          try {
            await acceptInvitation({ token: inviteToken });

            // 사용 완료 → 삭제
            localStorage.removeItem("inviteTokenPending");

            // 4️⃣ waiting 화면 이동
            nav("/waiting-connect", { replace: true });
            return;
          } catch (err) {
            console.error("초대 자동 수락 실패:", err);
          }
        }

        // 5️⃣ 평상 시에는 메인 이동
        nav("/", { replace: true });
      } catch (err) {
        console.error(err);
        nav("/login");
      }
    };

    if (accessToken) loginFlow();
    else nav("/login");
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
