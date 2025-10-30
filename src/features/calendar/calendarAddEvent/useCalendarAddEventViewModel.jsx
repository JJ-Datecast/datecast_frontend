import { create } from "zustand";
import { useNavigate } from "react-router-dom";
import { useCalendarStore } from "../store/useCalendarStore";
import {
  toLocalDateStr,
  roundNowTo30,
  add1h,
} from "../calendarAddEvent/calendarUtils";

export const useCalendarAddEventViewModel = create((set, get) => {
  const defaultStart = roundNowTo30();

  // React Router navigate를 store 안에서도 쓰기 위해 따로 저장
  let navigate;
  const setNavigator = (navFn) => {
    navigate = navFn;
  };

  return {
    // 기본 상태값
    startDate: toLocalDateStr(),
    endDate: toLocalDateStr(),
    startTime: defaultStart,
    endTime: add1h(defaultStart),
    selectedDate: null,

    // 🔹 form 객체 상태
    form: {
      title: "",
      place: "",
      desc: "",
    },

    // form 업데이트 함수
    setFormValue: (key, value) => {
      const { form } = get();
      set({ form: { ...form, [key]: value } });
    },

    // 날짜 초기화
    initSelectedDate: (date) => {
      set({
        startDate: date || toLocalDateStr(),
        endDate: date || toLocalDateStr(),
        selectedDate: date,
      });
    },

    // 날짜, 시간 setter
    setStartDate: (v) => set({ startDate: v }),
    setEndDate: (v) => set({ endDate: v }),

    setStartTime: (t) => {
      const nextEnd = add1h(t);
      const { startDate } = get();
      const [sh] = t.split(":").map(Number);
      const [eh] = nextEnd.split(":").map(Number);
      let newEndDate = startDate;

      if (eh < sh) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + 1);
        newEndDate = toLocalDateStr(d);
      }

      set({
        startTime: t,
        endTime: nextEnd,
        endDate: newEndDate,
      });
    },

    setEndTime: (t) => set({ endTime: t }),

    // 시간 옵션 리스트
    getTimeOptions: () =>
      Array.from({ length: 48 }, (_, i) => {
        const h = Math.floor(i / 2);
        const m = i % 2 === 0 ? "00" : "30";
        const period = h < 12 ? "오전" : "오후";
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        return {
          value: `${String(h).padStart(2, "0")}:${m}`,
          label: `${period} ${String(hour12).padStart(2, "0")}:${m}`,
        };
      }),

    // 일정 저장
    handleSave: () => {
      const { startDate, startTime, endDate, endTime, form } = get();
      const userId = localStorage.getItem("userId") || "guest";

      // Zustand store 접근
      const addEvent = useCalendarStore(userId).getState().addEvent;

      const newEvent = {
        id: Date.now(),
        title: form.title,
        place: form.place,
        desc: form.desc,
        startDate,
        endDate,
        startTime,
        endTime,
      };

      addEvent(newEvent);
      console.log("📅 등록된 일정:", newEvent);
      alert(`일정이 등록되었습니다.`);

      // 폼 초기화
      set({ form: { title: "", place: "", desc: "" } });

      // 저장 후 자동 이동
      if (navigate) {
        navigate("/calendarView");
      }
    },

    //  외부에서 navigate 등록용
    setNavigator,
  };
});
