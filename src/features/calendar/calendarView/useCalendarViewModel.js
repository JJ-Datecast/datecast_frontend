import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSchedule,getScheduleById } from "../../../networks/apis/scheduleApi";
import { formatDateToLocal } from "./calendarViewUtils";

export const useCalendarViewModel = () => {
  const nav = useNavigate();

  // 🔥 서버에서 받아온 일정 상태
  const [events, setEvents] = useState([]);

  // 🔥 서버 데이터 → 내부 캘린더 데이터로 변환 후 저장
  const setEventsFromServer = (list) => {
    if (!list) return;

    const converted = list.map((item) => ({
      id: item.scheduleId,
      title: item.title,
      description: item.description,
      place: item.placeName,

      startDate: item.startAt.split("T")[0],
      startTime: item.startAt.split("T")[1].slice(0, 5),

      endDate: item.endAt.split("T")[0],
      endTime: item.endAt.split("T")[1].slice(0, 5),
    }));

    setEvents(converted);
  };

  /* -------------------------------
   *  🔥 날짜 선택 상태
   * ------------------------------- */
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  /* -------------------------------
   *  🔥 특정 날짜에 해당하는 일정 찾기
   * ------------------------------- */
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

  /* -------------------------------
   *  🔥 날짜 클릭 → 일정 등록 페이지 이동
   * ------------------------------- */
  const onClickDate = (d) => {
    const clickedDate =
      `${d.getFullYear()}-` +
      `${String(d.getMonth() + 1).padStart(2, "0")}-` +
      `${String(d.getDate()).padStart(2, "0")}`;

    nav("/calendarAddEvent", { state: { date: clickedDate } });
  };

  /* -------------------------------
   *  🔥 일정 클릭 → 모달 표시
   * ------------------------------- */
  const onClickEvent = (eventObj, domEvent) => {
    domEvent.stopPropagation();

    const rect = domEvent.target.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5,
    };

    if (isModalOpen && selectedEvent?.id === eventObj.id) {
      closeModal();
      return;
    }

    setSelectedEvent(eventObj);
    setModalPosition(position);
    setIsModalOpen(true);
  };

  /* -------------------------------
   *  🔥 모달 닫기
   * ------------------------------- */
  const closeModal = useCallback(() => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  }, []);

  const onBackgroundClick = () => {
    if (isModalOpen) closeModal();
  };

  /* -------------------------------
   *  🔥 일정 삭제
   * ------------------------------- */
  const handleDelete = async () => {
    if (!selectedEvent) return;
  
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
    try {
      await deleteSchedule(selectedEvent.id);
  
      // 화면에서도 즉시 제거
      setEvents((prev) =>
        prev.filter((e) => e.id !== selectedEvent.id)
      );
  
      closeModal();
      alert("일정이 삭제되었습니다.");
    } catch (err) {
      console.error("삭제 실패:", err);
  
      const status = err?.response?.status;
  
      // 🔥 이미 후기 등록된 일정
      if (status === 500) {
        alert("이미 후기가 등록된 일정은 삭제할 수 없습니다.");
        return;
      }
  
      // 그 외 에러
      alert("일정 삭제 중 오류가 발생했습니다.");
    }
  };
  
  /* -------------------------------
   *  🔥 상세 보기 → 수정 페이지 이동
   * ------------------------------- */
  const handleDetail = async () => {
    if (!selectedEvent) return;
  
    try {
      const res = await getScheduleById(selectedEvent.id); // 🔥 서버에서 최신 데이터 GET
      const detail = res.data;
      
  
      nav("/calendarAddEvent", {
        state: {
          event: {
            id: detail.scheduleId,
            title: detail.title,
            description: detail.description,
            place: detail.placeName,
            startDate: detail.startAt.split("T")[0],
            startTime: detail.startAt.split("T")[1].slice(0, 5),
            endDate: detail.endAt.split("T")[0],
            endTime: detail.endAt.split("T")[1].slice(0, 5),
          },
        },
      });
  
      closeModal();
    } catch (err) {
      console.error("상세 조회 실패:", err);
      alert("일정 정보를 불러오지 못했습니다.");
    }
  };
  
  return {
    // 🔥 상태
    date,
    setDate,
    events,
    selectedEvent,
    isModalOpen,
    modalPosition,

    // 🔥 서버에서 받은 일정 세팅
    setEvents: setEventsFromServer,

    // 🔥 일정 그리기
    getEventsForDate,

    // 🔥 이벤트 핸들러
    onClickDate,
    onClickEvent,
    onBackgroundClick,
    closeModal,
    handleDelete,
    handleDetail,
  };
};
