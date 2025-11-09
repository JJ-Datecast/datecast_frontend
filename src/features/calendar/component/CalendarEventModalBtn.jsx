import "./CalendarEventModalBtn.css";
const CalendarEventModalBtn = ({ type, onClick, children }) => {
  return (
    <button
      className={`CalendarEventModaBtn CalendarEventModaBtn_${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CalendarEventModalBtn;
