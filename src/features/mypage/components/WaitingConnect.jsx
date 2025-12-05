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
        const user = await getUserMe();

        if (user.isCoupleComplete) {
          // 이미 커플인 상태면 다시 accept 요청하지 말기!
          navigate("/", { replace: true });
          return;
        }

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
