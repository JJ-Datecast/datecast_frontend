import "../calendarView/CalendarView.css";
import Calendar from "react-calendar";
import logo from "../../../assets/header/logo.png";
import { useCalendarViewModel } from "./useCalendarViewModel";
import CalendarEventModal from "../component/CalendarEventModal";
import { createPortal } from "react-dom";

const CalendarView = () => {
  const vm = useCalendarViewModel();

  return (
    <div className="CalendarView" onClick={vm.onBackgroundClick}>
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

      {/* Portal로 body에 모달 띄우기 (좌표 정확/레이어 충돌 방지) */}
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
