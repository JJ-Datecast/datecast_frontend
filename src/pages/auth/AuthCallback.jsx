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
    console.log("🌀 AuthCallback 실행됨!");

    const params = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(params.entries());
    console.log("📌 paramsObj:", paramsObj);

    const accessTokenFromUrl =
      paramsObj.token || paramsObj.accessToken || paramsObj.jwt || null;

    const pendingInviteToken = localStorage.getItem("inviteTokenPending");
    console.log(
      "📌 pendingInviteToken from localStorage =",
      pendingInviteToken
    );

    const runFlow = async () => {
      console.log("🔥 runFlow 시작");

      // ▶ AccessToken 저장 여부 확인
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🟢 accessToken 저장 완료");
      } else {
        console.log("⚠️ URL에서 토큰 안 왔음, 기존 토큰 사용 예정");
      }

      // ▶ 로그인 유저 조회
      let user = null;
      try {
        user = await getUserMe();
        console.log("🟢 getUserMe 성공 → user:", user);

        qc.setQueryData(["userMe"], user);
        setProfile(user);
      } catch (err) {
        console.log("🔴 getUserMe 실패 → 로그인 실패 처리");
        console.error(err);
        nav("/login");
        return;
      }

      console.log("🧠 로그인 확인된 사용자 ID:", user?.id);

      // ▶ 커플 정보 확인
      console.log("🔍 커플 정보 refetch 시작!");
      const coupleResult = await refetchCouple();
      console.log("🟣 coupleResult = ", coupleResult);

      const isAlreadyCoupled = !!coupleResult?.data?.data?.partner;
      console.log("💍 현재 커플 여부:", isAlreadyCoupled);

      if (isAlreadyCoupled) {
        console.log("🔴 이미 커플 연결되어 있음");
        alert("이미 커플로 등록된 사용자입니다 💗");
        nav("/mypage");
        return;
      }

      // ▶ 초대가 있을 때만 수락 여부 확인
      if (pendingInviteToken) {
        console.log("🟢 초대 토큰 존재 → alert 표시 준비");

        const confirmed = window.confirm(
          "커플 요청이 도착했습니다!\n수락하시겠습니까?"
        );

        console.log("🔍 confirm 결과:", confirmed);

        if (!confirmed) {
          console.log("❌ 사용자가 거절함");
          localStorage.removeItem("inviteTokenPending");
          alert("요청이 취소되었습니다.");
          nav("/");
          return;
        }

        // ▶ 수락 처리
        try {
          console.log("📌 accept API 실행!");
          await acceptInvitation({ token: pendingInviteToken });

          console.log("🎉 초대 수락 성공");
          localStorage.removeItem("inviteTokenPending");
          alert("커플 연결 완료!");
          nav("/waiting-connect");
          return;
        } catch (err) {
          console.log("🔴 accept API 실패");
          console.error(err);
          alert("수락 처리 중 오류 발생");
          nav("/");
          return;
        }
      }

      console.log("✨ 초대 없이 로그인 완료 → 홈 이동");
      nav("/");
    };

    runFlow();
  }, [nav, qc, setProfile, acceptInvitation, refetchCouple]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
