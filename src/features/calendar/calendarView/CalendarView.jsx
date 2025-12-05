// CalendarView.jsx

import "../calendarView/CalendarView.css";
import Calendar from "react-calendar";
import logo from "../../../assets/header/logo.png";
import { useCalendarViewModel } from "./useCalendarViewModel";
import CalendarEventModal from "../component/CalendarEventModal";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ToastMessage from "../../../shared/\bcomponents/ToastMessage";
import { useSchedules } from "../../../networks/hooks/useSchedule";

const CalendarView = () => {
  const vm = useCalendarViewModel();
  const nav = useNavigate();

  // ✔ 현재 선택된 달의 year, month 구하기
  const year = vm.date.getFullYear();
  const month = vm.date.getMonth() + 1;

  // ✔ year/month 전달
  const { data: schedules, isLoading } = useSchedules({ year, month });
  const { state } = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (schedules) {
      vm.setEvents(schedules);
    }
  }, [schedules]);

  useEffect(() => {
    if (state?.weatherMessage) {
      console.log("🔥 weatherMessage 감지됨:", state.weatherMessage);
      setToastMessage(state.weatherMessage);
      setOpenModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  return (
    <div className="CalendarView" onClick={vm.onBackgroundClick}>
      {openModal && (
        <ToastMessage
          message={toastMessage}
          duration={2000}
          onClose={() => setOpenModal(false)}
        />
      )}

      <button className="calendarview_button" onClick={() => nav("/")}>
        메인으로
      </button>

      <img src={logo} className="CalendarView_img" alt="로고" />

      {isLoading && <p>일정을 불러오는 중...</p>}

      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        onClickDay={vm.onClickDate}
        value={vm.date}
        onChange={vm.setDate}
        tileContent={({ date }) => {
          const dayEvents = vm.getEventsForDate(date);
          return (
            <div className="day-events">
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  className={`event-title event-${e.position}`}
                  onClick={(ev) => vm.onClickEvent(e, ev)}
                >
                  {e.title}
                </div>
              ))}
            </div>
          );
        }}
      />

      {vm.isModalOpen &&
        createPortal(
          <CalendarEventModal
            event={vm.selectedEvent}
            position={vm.modalPosition}
            onDelete={vm.handleDelete}
            onDetail={vm.handleDetail}
            onClose={vm.closeModal}
          />,
          document.body
        )}
    </div>
  );
};

export default CalendarView;
