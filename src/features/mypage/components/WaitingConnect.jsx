import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCoupleInvitationAccept } from "../../../networks/hooks/useCouple";

const AcceptInvitePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { mutate: acceptInvitation } = useCoupleInvitationAccept();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");
    const accessToken = localStorage.getItem("accessToken");

    if (!token) {
      alert("잘못된 초대입니다.");
      navigate("/");
      return;
    }

    // 로그인 안 되어 있으면 로그인 페이지로 이동
    if (!accessToken) {
      localStorage.setItem("inviteTokenPending", token);
      navigate("/login");
      return;
    }

    // 로그인 되어 있는 경우 → 바로 수락 처리
    acceptInvitation(
      { token },
      {
        onSuccess: () => {
          navigate("/waiting-connect");
        },
        onError: () => {
          alert("초대 수락에 실패했습니다.");
        },
      }
    );
  }, []);

  return <p>초대를 수락하는 중입니다...</p>;
};

export default AcceptInvitePage;
