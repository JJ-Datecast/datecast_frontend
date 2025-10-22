import "../css/AuthButton.css";

const AuthButton = ({onClick}) => {
    return(
        <button className="AuthButton" onClick={onClick}>
            로그인 / 회원가입
        </button>
    )
}

export default AuthButton;