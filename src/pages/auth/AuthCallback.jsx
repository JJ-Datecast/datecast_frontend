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

      /** 토큰이 URL에 있으면 저장 */
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🔥 accessToken 저장 완료");
      }

      /** 사용자 정보 조회 */
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

      /** 초대 토큰이 있을 때만 accept 실행 */
      if (finalInvitationToken) {
        console.log("🏹 초대 토큰 확인됨 →", finalInvitationToken);

        try {
          await acceptInvitation({ token: finalInvitationToken });
          localStorage.removeItem("inviteTokenPending");

          alert("❤️ 커플이 연결되었습니다!");
          nav("/accept-invite", { replace: true });
          return;
        } catch (err) {
          // 이미 수락된 경우 포함됨 → 여기서 UX 처리
          alert("❤️ 이미 커플 연결이 완료된 상태입니다!");
          localStorage.removeItem("inviteTokenPending");

          nav("/accept-invite", { replace: true });
          return;
        }
      }

      /**
       * 여기까지 오면 초대 실행 과정을 타지 않은 상태
       *
       * 즉, 로컬에 초대 토큰만 남아있다가 getUserMe 성공한 경우
       * → 이미 수락된 상태일 가능성 높음
       */
      if (pendingInviteToken) {
        alert("❤️ 커플 연결이 완료되었습니다!");
        localStorage.removeItem("inviteTokenPending");
      }

      /** 초대 없이 로그인 완료 → 홈 이동 */
      console.log("✨ 초대 없이 로그인 완료 → 홈 이동");
      nav("/", { replace: true });
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
