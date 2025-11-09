import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCalendarStore } from "../store/useCalendarStore.js";
import { formatDateToLocal } from "./calendarViewUtils";

export const useCalendarViewModel = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem("userId") || "guest";
  const { events, deleteEvent } = useCalendarStore(userId)();

  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  // 날짜 타일에 표시할 이벤트 계산 (뷰 모델에서 계산)
  const getEventsForDate = useCallback(
    (d) => {
      const localDate = formatDateToLocal(d);
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
    },
    [events]
  );

  // 날짜 클릭 → 신규 등록 화면
  const onClickDate = (d) => {
    const clickedDate =
      `${d.getFullYear()}-` +
      `${String(d.getMonth() + 1).padStart(2, "0")}-` +
      `${String(d.getDate()).padStart(2, "0")}`;
  
    nav("/calendarAddEvent", { state: { date: clickedDate } });
  };
  

  // 이벤트 클릭 → 모달 토글
  const onClickEvent = (eventObj, domEvent) => {
    domEvent.stopPropagation();
    const rect = domEvent.target.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5,
    };

    // 같은 이벤트를 다시 클릭하면 닫기
    if (isModalOpen && selectedEvent?.id === eventObj.id) {
      closeModal();
      return;
    }

    setSelectedEvent(eventObj);
    setModalPosition(position);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  }, []);

  // 배경 클릭 → 모달 닫기
  const onBackgroundClick = () => {
    if (isModalOpen) closeModal();
  };

  // 모달 액션: 삭제
  const handleDelete = () => {
    if (!selectedEvent) return;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteEvent(selectedEvent.id);
      closeModal();
    }
  };

  // 모달 액션: 상세보기(=등록 화면으로 이동 + 값 전달)
  const handleDetail = () => {
    if (!selectedEvent) return;
    nav("/calendarAddEvent", { state: { event: selectedEvent } });
    closeModal();
  };

  return {
    // state
    date,
    setDate,
    isModalOpen,
    modalPosition,
    selectedEvent,

    // lists
    getEventsForDate,

    // actions for view
    onClickDate,
    onClickEvent,
    onBackgroundClick,
    closeModal,
    handleDelete,
    handleDetail,
  };
};
