import "../css/AlterModal.css";
import alterIcon from "../../assets/alter/icon_alter.png";
import ActionButton from "./ActionButton";
const AlterModal = ({ title, subTitle, onClick, onCancel }) => {
  return (
    <div className="ModalOverlay">
      <div className="AlterModal">
        <div className="AlterModal_icon">
          <img src={alterIcon} />
        </div>
        <div className="AlterModal_content">
          <div className="AlterModal_content_title">
            <h4>{title}</h4>
          </div>
          <div className="AlterModal_content_subTitle">
            <h6>{subTitle}</h6>
          </div>
        </div>
        <div className="AlterModal_button">
          {subTitle ? (
            // subTitle이 있으면 버튼 2개
            <>
              <ActionButton onClick={onClick}>확인</ActionButton>
              <ActionButton type="ghost" onClick={onCancel}>
                취소
              </ActionButton>
            </>
          ) : (
            // subTitle이 없으면 버튼 1개
            <ActionButton onClick={onClick}>확인</ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};
export default AlterModal;
