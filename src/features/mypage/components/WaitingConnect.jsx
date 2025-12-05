import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserMe } from "../../../networks/apis/authApi";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutate: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/");
      return;
    }

    const checkLoginAndAccept = async () => {
      try {
        // ⭐ 실제 로그인 여부 확인 (핵심‼️)
        await getUserMe();

        // ⭐ 로그인 OK → 바로 accept 처리
        acceptInvitation(
          { token },
          {
            onSuccess: () => {
              navigate("/waiting-connect");
            },
          }
        );
      } catch (err) {
        // 로그인 안된 상태
        localStorage.setItem("inviteTokenPending", token);
        navigate("/login");
        console.error(err);
      }
    };

    checkLoginAndAccept();
  }, []);

  return <p>처리 중...</p>;
};

export default AcceptInvitePage;
