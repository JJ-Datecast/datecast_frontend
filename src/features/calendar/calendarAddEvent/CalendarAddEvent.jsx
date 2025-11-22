import "../calendarAddEvent/CalendarAddEvent.css";
import ActionButton from "../../../shared/components/ActionButton";
import CustomSelect from "../component/CustomSelect";

import { useCalendarAddEventViewModel } from "./useCalendarAddEventViewModel";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CalendarAddEvent = () => {
  const nav = useNavigate();
  const loc = useLocation();

  // ViewModel 생성
  const viewModel = useCalendarAddEventViewModel(loc.state);

  // 모달 상태
  const [openModal, setOpenModal] = useState(false);

  // Navigator 전달
  useEffect(() => {
    viewModel.setNavigator(nav);
  }, [nav]);

  const {
    isEdit,
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
    timeOptions,
    handleSave,
  } = viewModel;

  return (
    <div className="CalendarAddEvent">
      <div className="CalendarAddEvent_header">
        <h3 className="CalendarAddEvent_header-btn active">
          {isEdit ? "일정 수정" : "일정 등록"}
        </h3>

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
        onSubmit={async (e) => {
          e.preventDefault();

          const result = await handleSave();

          // 🔥 저장 성공 시 → 토스트 띄우기
          if (result !== false) {
            setOpenModal(true);

            // 🔥 모달이 보이도록 딜레이 후 이동
            setTimeout(() => {
              nav("/calendarView");
            }, 1200);
          }
        }}
      >
        {/* 제목 */}
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          required
          placeholder="일정 제목을 입력하세요."
          className="CalendarAddEvent_input"
          value={form.title}
          onChange={(e) => setFormValue("title", e.target.value)}
        />

        {/* 장소 */}
        <label htmlFor="place">장소</label>
        <input
          id="place"
          type="text"
          placeholder="장소를 입력하세요."
          className="CalendarAddEvent_input"
          value={form.place}
          onChange={(e) => setFormValue("place", e.target.value)}
        />

        {/* 날짜 + 시간 */}
        <label>일시</label>
        <div className="CalendarAddEvent_date-group">
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

        {/* 설명 */}
        <label htmlFor="desc">설명</label>
        <textarea
          id="desc"
          placeholder="일정에 필요한 설명을 남기세요."
          className="CalendarAddEvent_textarea"
          value={form.desc}
          onChange={(e) => setFormValue("desc", e.target.value)}
        />

        {/* 버튼 */}
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
