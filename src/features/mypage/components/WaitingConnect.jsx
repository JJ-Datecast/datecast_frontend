import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserMe } from "../../../networks/apis/authApi";
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
      try {
        console.log("🚀 로그인 여부(userMe) 확인 요청");
        const user = await getUserMe();
        console.log("✔ 로그인 상태 확인 성공:", user);

        console.log("🏹 커플 초대 수락 요청");
        await acceptInvitation({ token });

        console.log("🎉 초대 수락 성공 → waiting 이동");
        navigate("/waiting-connect", { replace: true });
      } catch (err) {
        console.log("❌ 로그인 상태 아님 → 로그인 페이지로 이동");
        console.error(err);
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login", { replace: true });
      }
    };

    checkLoginAndAccept();
  }, []);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
