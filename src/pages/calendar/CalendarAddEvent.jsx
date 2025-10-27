import ActionButton from "../../shared/\bcomponents/ActionButton";
import "../css/CalendarAddEvent.css";
import { useNavigate } from "react-router-dom";

const CalendarAddEvent = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    alert("일정이 저장되었습니다 ✅");
  };

  return (
    <div className="CalendarAddEvent">
      {/* 🔹 헤더 부분 */}
      <div className="CalendarAddEvent_header">
        <button className="CalendarAddEvent_header-btn active">일정등록</button>
        <span className="CalendarAddEvent_divider">|</span>
        <button
          className="CalendarAddEvent_header-btn"
          onClick={() => navigate("/calendarView")}
        >
          이전으로 돌아가기
        </button>
      </div>

      {/* 🔹 폼 부분 */}
      <form className="CalendarAddEvent_form" onSubmit={handleSave}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="일정 제목을 입력하세요."
          className="CalendarAddEvent_input"
          required
        />

        <label htmlFor="place">장소</label>
        <input
          id="place"
          type="text"
          placeholder="장소를 입력하세요."
          className="CalendarAddEvent_input"
        />

        <label>일시</label>
        <div className="CalendarAddEvent_date-group">
          <input type="date" defaultValue="2025-11-11" />
          <select defaultValue="오전 01:00">
            <option>오전 01:00</option>
            <option>오전 02:00</option>
            <option>오전 03:00</option>
            <option>오전 04:00</option>
            <option>오전 05:00</option>
          </select>
          <span>-</span>
          <input type="date" defaultValue="2025-11-11" />
          <select defaultValue="오전 02:00">
            <option>오전 02:00</option>
            <option>오전 03:00</option>
            <option>오전 04:00</option>
            <option>오전 05:00</option>
          </select>
        </div>

        <label htmlFor="desc">설명</label>
        <textarea
          id="desc"
          placeholder="일정에 필요한 설명을 남기세요."
          className="CalendarAddEvent_textarea"
        ></textarea>

        <div className="CalendarAddEvent_buttons">
          <ActionButton children={"저장"} type={"save"} />
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarAddEvent;
