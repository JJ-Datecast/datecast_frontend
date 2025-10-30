import "./CalendarEventModal.css";

const CalendarEventModal = ({ title, date, desc }) => {
  return (
    <div className="CalendarEventModal">
      <div className="CalendarEventModal_title">
        <h3>변백현 생일</h3>
      </div>
      <div className="CalendarEventModal_body">
        <div className="CalendarEventModal_content">
          <div className="CalendarEventModal_content_item">
            <label>일시</label>
            <p>2025.11.12 오후 09:30 - 2025.11.13 오후 10:30</p>
          </div>
          <div className="CalendarEventModal_content_item">
            <label>내용</label>
            <p>한남동 유엔빌리지에서 만나자.</p>
          </div>
        </div>
        <div className="CalendarEventModal_actions"></div>
      </div>
    </div>
  );
};

export default CalendarEventModal;
