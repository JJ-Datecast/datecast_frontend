import "./CalendarEventModal.css";
import CalendarEventModalBtn from "./CalendarEventModalBtn.jsx";
import logo from "../../../assets/modal/moalIMG.png";

const CalendarEventModal = ({ event, position, onDelete, onDetail }) => {
  if (!event) return null;

  const { title, desc, place, startDate, endDate, startTime, endTime } = event;
  const isSameDate = startDate === endDate;
  const displayDateTime = isSameDate
    ? `${startDate} ${startTime} ~ ${endTime}`
    : `${startDate} ${startTime} ~ ${endDate} ${endTime}`;

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
      <div className="CalendarEventModal_title">
        <img src={logo} alt="logo" className="CalendarEventModal_title_img" />
        <h3>{title}</h3>
      </div>

      <div className="CalendarEventModal_body">
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
            <p>{desc}</p>
          </div>
        </div>

        <div className="CalendarEventModal_actions">
          <CalendarEventModalBtn onClick={onDelete} children={"삭제"} />
          <CalendarEventModalBtn
            type="pink"
            onClick={onDetail}
            children={"상세보기"}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;
