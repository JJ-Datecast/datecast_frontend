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
  const { refetch: refetchCouple } = useCoupleMe(); // 커플 연결 상태 확인

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(params.entries());
    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");

    const runFlow = async () => {
      console.log("🔐 AuthCallback 진입");

      // 로그인 토큰 저장
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🌟 access token 저장 완료");
      }

      // 사용자 정보 확인
      let user;
      try {
        user = await getUserMe();
        qc.setQueryData(["userMe"], user);
        setProfile(user);
      } catch (err) {
        console.log("❌ 로그인 실패 → 로그인으로 이동");
        nav("/login", { replace: true });
        return;
      }

      // 커플 상태 조회
      const coupleResult = await refetchCouple();
      const isAlreadyCoupled = !!coupleResult.data?.data?.partner;

      // 🍀 이미 커플이면
      if (isAlreadyCoupled) {
        alert("이미 커플로 등록된 사용자입니다 💗");
        nav("/mypage");
        return;
      }

      // 초대 토큰이 있을 경우 → 사용자의 동의 필요
      if (pendingInviteToken) {
        const confirmed = window.confirm(
          "커플 요청이 도착했습니다! 수락하시겠습니까?"
        );

        if (confirmed) {
          try {
            await acceptInvitation({ token: pendingInviteToken });
            localStorage.removeItem("inviteTokenPending");

            alert("🎉 커플 연결이 완료되었습니다!");
            nav("/waiting-connect");
            return;
          } catch (err) {
            alert("수락 처리 중 오류 발생. 다시 시도해주세요.");
            nav("/");
            return;
          }
        } else {
          alert("요청이 취소되었습니다.");
          localStorage.removeItem("inviteTokenPending");
          nav("/");
          return;
        }
      }

      // 🚀 초대 없는 일반 로그인 → 홈 이동
      nav("/");
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation, refetchCouple]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
