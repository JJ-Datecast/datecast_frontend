import "./CalendarEventModalBtn.css";

const CalendarEventModalBtn = ({ type, onClick, children, disabled }) => {
  return (
    <button
      className={`CalendarEventModaBtn CalendarEventModaBtn_${type} ${
        disabled ? "CalendarEventModaBtn_disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CalendarEventModalBtn;
