import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserMe } from "../../networks/apis/authApi";
import { useProfileStore } from "../../store/profileStore";

const AuthCallback = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  const setProfileFromServer = useProfileStore((s) => s.setProfileFromServer);

  useEffect(() => {
    let isRun = false; // 🔥 실행 방지 플래그

    if (isRun) return;
    isRun = true;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("token");

    const loginFlow = async () => {
      try {
        localStorage.setItem("accessToken", accessToken);
        const user = await getUserMe();
        qc.setQueryData(["userMe"], user);
        setProfileFromServer(user);
        nav("/", { replace: true });
      } catch (err) {
        console.error(err);
        nav("/login");
      }
    };

    if (accessToken) loginFlow();
    else nav("/login");
  }, []);

  return <div>로그인 처리 중...</div>;
};
export default AuthCallback;
