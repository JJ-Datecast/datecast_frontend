import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserMe } from "../../../networks/apis/authApi";
import { getCoupleMe } from "../../../networks/apis/coupleApi"; // ⭐ 중요
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

      if (!accessToken) {
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
        return;
      }

      try {
        // 1️⃣ 로그인된 사람인지 확인
        await getUserMe();

        // 2️⃣ 커플 상태 체크
        let coupleMe = null;
        try {
          coupleMe = await getCoupleMe(); // 정상일 경우 커플 정보 나옴
        } catch (err) {
          // ❗ 실패는 커플이 아직 없다는 의미
          // 400 / 404 모두 정상 상황
        }

        // 3️⃣ 이미 커플이면 → accept할 필요 없음
        if (coupleMe?.coupleId) {
          navigate("/", { replace: true });
          return;
        }

        // 4️⃣ 커플이 아니면 accept 실행
        await acceptInvitation({ token });
        navigate("/waiting-connect", { replace: true });
      } catch (err) {
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
      }
    };

    checkLoginAndAccept();
  }, []);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
