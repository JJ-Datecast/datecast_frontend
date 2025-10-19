import logo from "../../assets/header/logo.png";
import sidebarBtn from "../../assets/header/sidebarButton.png"
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import InitialButton from "./InitialButton";



const Header = ({isLoggedIn}) => {
    const nav = useNavigate();
    return(
        <>
            <header className="Header">
                <div className="header_left"><img src={logo}/></div>
                <div className="header_right">
                    <div className="header_right_left">{isLoggedIn ? "로그인 됨" : <InitialButton childern={"로그인/회원가입"} onClick={()=>nav('/login')}/>}</div>
                    <div className="header_right_right"><img src={sidebarBtn}/></div>
                </div>
            </header>
        </>
    )
}
export default Header;

