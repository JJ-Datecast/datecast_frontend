import "./CalendarEventModal.css";
import CalendarEventModalBtn from "./CalendarEventModalBtn.jsx";
import logo from "../../../assets/modal/moalIMG.png";
import { useNavigate } from "react-router-dom";

const CalendarEventModal = ({ event, position, onDelete, onDetail }) => {
  const nav = useNavigate();

  if (!event) return null;

  const {
    id,
    title,
    description,
    place,
    startDate,
    endDate,
    startTime,
    endTime,
    hasReview, // 이미 후기 작성 여부 (있다면)
  } = event;

  /* =========================
     후기 작성 가능 여부 (수정)
     기준: 일정 종료 이후
  ========================= */
  const now = new Date();

  // 이벤트 종료 시각
  const eventEndDateTime = new Date(`${endDate}T${endTime}:00`);

  // 후기 작성 가능 여부
  const canWriteReview =
    now >= eventEndDateTime && !hasReview; // hasReview 없으면 제거 가능

  /* =========================
     날짜 표시
  ========================= */
  const isSameDate = startDate === endDate;
  const displayDateTime = isSameDate
    ? `${startDate} ${startTime} ~ ${endTime}`
    : `${startDate} ${startTime} ~ ${endDate} ${endTime}`;

  const handleWriteReview = () => {
    if (!canWriteReview) return;

    nav("/date-review", {
      state: {
        scheduleId: id,
        title,
        place,
        date: startDate,
      },
    });
  };

  return (
    <div
      className="CalendarEventModal"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        zIndex: 9999,
      }}
    >
      {/* 타이틀 */}
      <div className="CalendarEventModal_title">
        <img src={logo} alt="logo" className="CalendarEventModal_title_img" />
        <h3>{title}</h3>
      </div>

      <div className="CalendarEventModal_body">
        {/* 내용 */}
        <div className="CalendarEventModal_content">
          <div className="CalendarEventModal_content_item">
            <label>일시</label>
            <p>{displayDateTime}</p>
          </div>

          {place && (
            <div className="CalendarEventModal_content_item">
              <label>장소</label>
              <p>{place}</p>
            </div>
          )}

          <div className="CalendarEventModal_content_item">
            <label>내용</label>
            <p>{description}</p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="CalendarEventModal_actions">
          <CalendarEventModalBtn onClick={onDelete}>
            삭제
          </CalendarEventModalBtn>

          <CalendarEventModalBtn type="pink" onClick={onDetail}>
            상세보기
          </CalendarEventModalBtn>

          <CalendarEventModalBtn
            type={canWriteReview ? "today" : "lightpink"}
            disabled={!canWriteReview}
            onClick={handleWriteReview}
          >
            후기작성
          </CalendarEventModalBtn>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;