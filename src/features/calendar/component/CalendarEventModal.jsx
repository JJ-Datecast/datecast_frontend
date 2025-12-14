import "./CalendarEventModal.css";
import CalendarEventModalBtn from "./CalendarEventModalBtn.jsx";
import logo from "../../../assets/modal/moalIMG.png";
import { useNavigate } from "react-router-dom";

const CalendarEventModal = ({ event, position, onDelete, onDetail }) => {
  const nav = useNavigate();

  if (!event) return null;

  const { title, description, place, startDate, endDate, startTime, endTime } =
    event;

  /* =========================
     날짜 + 시간 비교 로직
  ========================= */
  const now = new Date();

  // 오늘 날짜 (시간 제거)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 이벤트 날짜 (시간 제거)
  const eventDate = new Date(`${startDate}T00:00:00`);
  eventDate.setHours(0, 0, 0, 0);

  const isToday = today.getTime() === eventDate.getTime();

  // 이벤트 시작 시각
  const eventStartDateTime = new Date(`${startDate}T${startTime}:00`);

  // 후기 작성 가능 여부
  const canWriteReview = isToday && now >= eventStartDateTime;

  /* =========================
     날짜 표시
  ========================= */
  const isSameDate = startDate === endDate;
  const displayDateTime = isSameDate
    ? `${startDate} ${startTime} ~ ${endTime}`
    : `${startDate} ${startTime} ~ ${endDate} ${endTime}`;

  const handleWriteReview = () => {
    if (!canWriteReview) return;

    console.log("🔥 후기 작성 이동");
    nav("/date-review", {
      state: {
        scheduleId: event.id,
        title: event.title,
        place: event.place,
        date: event.startDate,
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
          <CalendarEventModalBtn onClick={onDelete}>삭제</CalendarEventModalBtn>

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
