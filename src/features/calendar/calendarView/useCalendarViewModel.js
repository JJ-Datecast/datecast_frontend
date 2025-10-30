// features/calendarView/viewModel/useCalendarViewModel.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCalendarStore } from "../store/useCalendarStore";
import { formatDateToLocal } from "./calendarViewUtils";

export const useCalendarViewModel = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem("userId") || "guest";
  const { events = [] } = useCalendarStore(userId)();

  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const getEventsForDate = (date) => {
    const localDate = formatDateToLocal(date);
    const current = new Date(localDate);
  
    return events
      .filter((e) => {
        const start = new Date(e.startDate);
        const end = new Date(e.endDate);
        return current >= start && current <= end;
      })
      .map((e) => {
        const start = new Date(e.startDate);
        const end = new Date(e.endDate);
        let position = "middle";
  
        if (current.getTime() === start.getTime()) position = "start";
        else if (current.getTime() === end.getTime()) position = "end";
  
        return { ...e, position };
      });
  };
  
  

  const onClickDate = (date) => {
    const clickedDate = formatDateToLocal(date);
    nav("/calendarAddEvent", { state: { date: clickedDate } });
  };

  return {
    nav,
    date,
    setDate,
    events,
    selectedEvent,
    isModalOpen,
    openModal,
    closeModal,
    getEventsForDate,
    onClickDate,
  };
};
