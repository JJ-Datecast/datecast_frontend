import "../css/CoupleStatus.css";
import emailIMG from "../../../assets/mypage/coupleEmailIcon.png";
import BigActionButton from "../../../shared/components/BigActionButton";

const PreConnect = ({ setShowConnect }) => {
  return (
    <div className="couple-status">
      <div className="couple-status-top">
        <img
          src={emailIMG}
          alt="이메일 아이콘"
          className="couple-status-icon"
        />
        <h3>
          아직 연결된 사람이 없어요.
          <br />
          누군가에게 마음을 전해볼까요?
        </h3>
      </div>

      <div className="couple-status-bottom">
        <BigActionButton onClick={() => setShowConnect(true)}>
          마음 전하러 가기
        </BigActionButton>
      </div>
    </div>
  );
};

export default PreConnect;
