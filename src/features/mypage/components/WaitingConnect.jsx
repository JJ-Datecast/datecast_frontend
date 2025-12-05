import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserMe } from "../../../networks/apis/authApi";
import { getCoupleMe } from "../../../networks/apis/coupleApi"; // ⭐ 추가
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/", { replace: true });
      return;
    }

    const checkLoginAndAccept = async () => {
      const accessToken = localStorage.getItem("accessToken");

      // 로그인 안된 상태면 로그인으로 보내되, 초대 토큰 저장
      if (!accessToken) {
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
        return;
      }

      try {
        // 1️⃣ 로그인된 사람 정보 조회
        await getUserMe(); // 성공하면 로그인됨

        // 2️⃣ 커플 등록 여부 조회!! ⭐
        const coupleMe = await getCoupleMe();

        // 커플 등록된 상태라면 이미 연결 끝난 상태 → 메인으로 이동
        if (coupleMe && coupleMe.coupleId) {
          navigate("/", { replace: true });
          return;
        }

        // 3️⃣ 아직 미등록이면 accept 요청
        await acceptInvitation({ token });
        navigate("/waiting-connect", { replace: true });
      } catch (err) {
        console.error("로그인 정보 확인 실패 또는 커플 API 실패", err);
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
      }
    };

    checkLoginAndAccept();
  }, []);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
