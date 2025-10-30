// features/calendarView/view/CalendarView.jsx
import "../calendarView/CalendarView.css";
import Calendar from "react-calendar";
import logo from "../../../assets/header/logo.png";
import { useCalendarViewModel } from "./useCalendarViewModel";
// import EventModal from "./EventModal";

const CalendarView = () => {
  const {
    date,
    setDate,
    getEventsForDate,
    onClickDate,
    openModal,
    closeModal,
    isModalOpen,
    selectedEvent,
  } = useCalendarViewModel();

  return (
    <div className="CalendarView">
      <img src={logo} className="CalendarView_img" alt="로고" />
      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        onClickDay={onClickDate}
        value={date}
        onChange={setDate}
        tileContent={({ date }) => {
          const dayEvents = getEventsForDate(date);
          return (
            <div className="day-events">
              {dayEvents.map((e) => (
                <div
                  key={e.id}
                  className={`event-title event-${e.position}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    openModal(e);
                  }}
                >
                  {e.title}
                </div>
              ))}
            </div>
          );
        }}
      />

      {/* 모달 */}
      {isModalOpen && console.log("모달 클릭")}
    </div>
  );
};

export default CalendarView;
