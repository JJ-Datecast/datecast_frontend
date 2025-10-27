import "../css/CalendarView.css";
import Calendar from "react-calendar";
import { useState } from "react";
import logo from "../../assets/header/logo.png"; // ✅ src 내부 파일 import

const CalendarView = ({ onClick }) => {
  return (
    <div className="CalendarView">
      <img src={logo} className="CalendarView_img" />
      <Calendar locale="ko-KR" calendarType="gregory" />
    </div>
  );
};

export default CalendarView;
