import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "../../../networks/hooks/useSchedule";

export const useCalendarAddEventViewModel = (initial) => {
  const navRef = useRef(null);
  const setNavigator = (nav) => (navRef.current = nav);

  // 초기값
  const isEdit = !!initial?.event;
  const eventData = initial?.event || null;
  const selectedDate = initial?.date || null;

  // 서버 mutation
  const { mutateAsync: createSchedule } = useCreateSchedule();
  const { mutateAsync: updateSchedule } = useUpdateSchedule();

  // Form State
  const [form, setForm] = useState({
    title: "",
    place: "",
    desc: "",
  });

  const setFormValue = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // 날짜/시간 상태
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 시간 선택 옵션
  const timeOptions = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => {
      const hh = String(Math.floor(i / 2)).padStart(2, "0");
      const mm = i % 2 === 0 ? "00" : "30";
      const t = `${hh}:${mm}`;
      return { label: t, value: t };
    });
  }, []);

  // 현재 시간을 30분 단위로 반올림
  const getRoundedCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

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

  // 초기 데이터 세팅 (등록 / 수정)
  useEffect(() => {
    if (isEdit && eventData) {
      setFormValue("title", eventData.title);
      setFormValue("place", eventData.place);
      setFormValue("desc", eventData.description);

      setStartDate(eventData.startDate);
      setEndDate(eventData.endDate);

      setStartTime(eventData.startTime);
      setEndTime(eventData.endTime);
      return;
    }

    if (!isEdit && selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);

      const time = getRoundedCurrentTime();
      setStartTime(time);

      const [h, m] = time.split(":").map(Number);
      const end = `${String((h + 1) % 24).padStart(2, "0")}:${String(
        m
      ).padStart(2, "0")}`;
      setEndTime(end);
    }
  }, [isEdit, selectedDate, eventData]);

  // 저장 (등록 / 수정)
  const handleSave = useCallback(async () => {
    try {
      const payload = {
        title: form.title.trim(),
        description: form.desc.trim(),
        placeName: form.place.trim(),
        latitude: 0,
        longitude: 0,
        startAt: `${startDate}T${startTime}:00`,
        endAt: `${endDate}T${endTime}:00`,
        geofenceRadiusM: 0,
        canReview: true,
      };

      let result;

      /* ------------------------------
         🔥 수정 모드
        ------------------------------ */
      if (isEdit) {
        result = await updateSchedule({ id: eventData.id, body: payload });

        console.log("🎉 일정 수정 성공!", result);

        navRef.current?.("/calendarView", {
          state: { toast: "edit" },
        });

        return result;
      }

      /* ------------------------------
         🔥 신규 생성 모드
        ------------------------------ */
      result = await createSchedule(payload);

      console.log("🎉 일정 생성 성공!", result);

      // axios 응답 구조 → result.data.weatherMessage
      const weatherMessage = result?.data?.weatherMessage;

      console.log("🌤 weatherMessage:", weatherMessage);

      // CalendarView로 메시지 전달
      navRef.current?.("/calendarView", {
        state: {
          toast: "add",
          weatherMessage,
        },
      });

      // 상위에서도 사용할 수 있게 return
      return weatherMessage;
    } catch (err) {
      console.error("일정 저장 실패:", err.response?.data || err);
      return false;
    }
  }, [
    form,
    startDate,
    startTime,
    endDate,
    endTime,
    isEdit,
    eventData,
    updateSchedule,
    createSchedule,
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
    timeOptions,
    handleSave,
    setNavigator,
  };
};
