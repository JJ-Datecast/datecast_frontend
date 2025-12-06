import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../../networks/apis/authApi";
import { useProfileStore } from "../../../store/profileStore";
import {
  useCoupleInvitationAccept,
  useCoupleMe,
} from "../../../networks/hooks/useCouple";

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

    const pendingInviteToken = localStorage.getItem("pendingInviteToken");
    console.log("📌 pendingInviteToken =", pendingInviteToken);

    const run = async () => {
      console.log("🔐 AuthCallback 진입");

      // 1) accessToken 저장
      if (accessTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        console.log("🌟 accessToken 저장 완료");
      }

      // 2) 로그인된 사용자 정보 가져오기
      let user;
      try {
        user = await getUserMe();
        console.log("👤 getUserMe 성공:", user);

        qc.setQueryData(["userMe"], user);
        setProfile(user);
      } catch (err) {
        console.log("❌ getUserMe 실패 → 다시 로그인 필요");
        nav("/login", { replace: true });
        return;
      }

      // 3) 초대 토큰이 아예 없으면 → 일반 로그인 흐름
      if (!pendingInviteToken) {
        console.log("✨ 초대 없이 일반 로그인 → 홈 이동");
        nav("/", { replace: true });
        return;
      }

      // 4) 현재 로그인한 유저의 커플 여부 확인
      console.log("🔍 커플 정보 조회 시작");
      const coupleResult = await refetchCouple();
      console.log("🟣 coupleResult:", coupleResult);

      const alreadyCoupled = !!coupleResult?.data?.data?.partner;
      console.log("💍 이미 커플 여부 =", alreadyCoupled);

      // 5) 이미 커플이면 → 초대 무시
      if (alreadyCoupled) {
        alert("이미 커플로 등록된 사용자입니다.");
        localStorage.removeItem("pendingInviteToken");
        nav("/", { replace: true });
        return;
      }

      // 6) 아직 커플이 아니면 → 초대 수락 API 호출
      try {
        console.log("🏹 초대 수락 API 호출 시작:", pendingInviteToken);
        await acceptInvitation({ token: pendingInviteToken });

        alert("커플 매칭 성공! 💕");

        localStorage.removeItem("pendingInviteToken");
        nav("/", { replace: true });
        return;
      } catch (err) {
        console.error("❌ 커플 초대 수락 실패:", err);
        const msg =
          err?.response?.data?.message || "초대 처리 중 문제가 발생했습니다.";
        alert(msg);

        localStorage.removeItem("pendingInviteToken");
        nav("/", { replace: true });
        return;
      }
    };

    run();
  }, [nav, qc, setProfile, acceptInvitation, refetchCouple]);

  return <div>로그인 처리 중...</div>;
};

export default AuthCallback;
