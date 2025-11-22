import "../calendarView/CalendarView.css";
import Calendar from "react-calendar";
import logo from "../../../assets/header/logo.png";
import { useCalendarViewModel } from "./useCalendarViewModel";
import CalendarEventModal from "../component/CalendarEventModal";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ToastMessage from "../../../shared/components/ToastMessage";

const CalendarView = () => {
  const vm = useCalendarViewModel();
  const nav = useNavigate();
  const loc = useLocation();

  // 🔥 토스트 모달 상태
  const [openModal, setOpenModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 🔥 navigate()에서 보내온 state 읽기
  useEffect(() => {
    if (loc.state?.toast) {
      if (loc.state.toast === "add") {
        setToastMessage("밤에는 날씨가 추우니 겉옷을 챙기세요 ☔️");
      } else if (loc.state.toast === "edit") {
        setToastMessage("밤에는 날씨가 추우니 겉옷을 챙기세요.");
      }

      setOpenModal(true);
    }
  }, [loc.state]);

  return (
    <div className="CalendarView" onClick={vm.onBackgroundClick}>
      {/* 상단 토스트 모달 */}
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

      {/* Portal로 body에 모달 띄우기 */}
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
