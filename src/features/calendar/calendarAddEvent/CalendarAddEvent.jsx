import "../calendarAddEvent/CalendarAddEvent.css";
import ActionButton from "../../../shared/components/ActionButton";
import CustomSelect from "../component/CustomSelect";
import { useCalendarAddEventViewModel } from "./useCalendarAddEventViewModel";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CalendarAddEvent = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const viewModel = useCalendarAddEventViewModel();

  // navigate를 viewModel에 등록
  useEffect(() => {
    viewModel.setNavigator(nav);
  }, [nav, viewModel]);

  const {
    form,
    setFormValue,
    startDate,
    endDate,
    startTime,
    endTime,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    initSelectedDate,
    getTimeOptions,
    handleSave,
  } = useCalendarAddEventViewModel();

  const selectedDate = loc.state?.date;

  useEffect(() => {
    initSelectedDate(selectedDate);
  }, [selectedDate]);

  const timeOptions = getTimeOptions();

  return (
    <div className="CalendarAddEvent">
      <div className="CalendarAddEvent_header">
        <h3 className="CalendarAddEvent_header-btn active">일정등록</h3>
        <span className="CalendarAddEvent_divider">|</span>
        <button
          className="CalendarAddEvent_header-btn"
          onClick={() => nav("/calendarView")}
        >
          이전으로 돌아가기
        </button>
      </div>

      <form
        className="CalendarAddEvent_form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="일정 제목을 입력하세요."
          className="CalendarAddEvent_input"
          required
          value={form.title}
          onChange={(e) => setFormValue("title", e.target.value)}
        />

        <label htmlFor="place">장소</label>
        <input
          id="place"
          type="text"
          placeholder="장소를 입력하세요."
          className="CalendarAddEvent_input"
          value={form.place}
          onChange={(e) => setFormValue("place", e.target.value)}
        />

        <label>일시</label>
        <div className="CalendarAddEvent_date-group" style={{ gap: 12 }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <CustomSelect
            value={startTime}
            onChange={setStartTime}
            options={timeOptions}
          />

          <span>-</span>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <CustomSelect
            value={endTime}
            onChange={setEndTime}
            options={timeOptions}
          />
        </div>

        <label htmlFor="desc">설명</label>
        <textarea
          id="desc"
          placeholder="일정에 필요한 설명을 남기세요."
          className="CalendarAddEvent_textarea"
          value={form.desc}
          onChange={(e) => setFormValue("desc", e.target.value)}
        ></textarea>

        <div className="CalendarAddEvent_buttons">
          <ActionButton children={"저장"} type={"save"} />
          <button type="button" className="cancel-btn" onClick={() => nav(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalendarAddEvent;
