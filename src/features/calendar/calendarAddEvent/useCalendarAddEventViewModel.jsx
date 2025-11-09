import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useCalendarStore } from "../store/useCalendarStore";

export const useCalendarAddEventViewModel = (initial) => {
  const userId = localStorage.getItem("userId") || "guest";
  const { addEvent, updateEvent } = useCalendarStore(userId)();

  const navRef = useRef(null);
  const setNavigator = (nav) => (navRef.current = nav);

  const isEdit = !!initial?.event;
  const eventData = initial?.event || null;
  const selectedDate = initial?.date || null;

  // --------------------------
  // ✅ Form State
  // --------------------------
  const [form, setForm] = useState({
    title: "",
    place: "",
    desc: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const setFormValue = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // --------------------------
  // ✅ 시간 옵션 — useMemo로 고정
  // --------------------------
  const timeOptions = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => {
      const hh = String(Math.floor(i / 2)).padStart(2, "0");
      const mm = i % 2 === 0 ? "00" : "30";
      const t = `${hh}:${mm}`;
      return { label: t, value: t }; // ✅ CustomSelect가 기대하는 구조!
    });
  }, []);

  // --------------------------
  // ✅ 기본 시간 — 현재 시간 반올림해서 설정
  // --------------------------
  const getRoundedCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    // ✅ 0~29 → 30분
    // ✅ 30~59 → 다음 시간 정각
    if (minute < 30) {
      minute = 30;
    } else {
      minute = 0;
      hour = (hour + 1) % 24;
    }

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  // --------------------------
  // ✅ Init Logic (수정 모드 + 신규 등록 모드)
  // --------------------------
  useEffect(() => {
    if (isEdit && eventData) {
      // ✅ 기존 일정 불러오기
      setFormValue("title", eventData.title);
      setFormValue("place", eventData.place);
      setFormValue("desc", eventData.desc);

      setStartDate(eventData.startDate);
      setEndDate(eventData.endDate);

      setStartTime(eventData.startTime);
      setEndTime(eventData.endTime);
    }

    if (!isEdit && selectedDate) {
      // ✅ 신규 일정 등록 모드
      setStartDate(selectedDate);
      setEndDate(selectedDate);

      const time = getRoundedCurrentTime();
      setStartTime(time);

      // 기본 종료 시간 = 시작 시간 + 1시간
      const [h, m] = time.split(":").map(Number);
      const end = `${String((h + 1) % 24).padStart(2, "0")}:${String(
        m
      ).padStart(2, "0")}`;

      setEndTime(end);
    }
  }, [isEdit, selectedDate]);

  // --------------------------
  // ✅ Save
  // --------------------------
  const handleSave = useCallback(() => {
    const payload = {
      ...(isEdit ? { id: eventData.id } : {}),
      title: form.title.trim(),
      place: form.place.trim(),
      desc: form.desc.trim(),
      startDate,
      startTime,
      endDate,
      endTime,
    };

    if (isEdit) {
      updateEvent(payload);
      alert("일정이 수정되었습니다.");
    } else {
      addEvent(payload);
      alert("일정이 등록되었습니다.");
    }

    navRef.current?.("/calendarView");
  }, [
    isEdit,
    form,
    startDate,
    startTime,
    endDate,
    endTime,
    addEvent,
    updateEvent,
    eventData,
  ]);

  return {
    isEdit,
    form,
    setFormValue,
    startDate,
    endDate,
    startTime,
    endTime,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    timeOptions, // ✅ 드롭다운 옵션
    handleSave,
    setNavigator,
  };
};
