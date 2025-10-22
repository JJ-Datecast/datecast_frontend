import "../css/SideBar.css";
import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const nav = useNavigate();

    return(
        <div className="SideBar">
            <div className="SideBar_AuthBtn">
                <AuthButton/>
            </div>
            
            <div className="SideBar_content">
                <ul>
                    <li onClick={()=>nav("/calendarAddEvent")}>캘린더</li>
                    <li onClick={()=>nav("/profile")}>마이페이지</li>
                    <li onClick={()=>nav("/profile")}>저장된 장소</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;