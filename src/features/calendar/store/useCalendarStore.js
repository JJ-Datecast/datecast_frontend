import { create } from "zustand";
import { persist } from "zustand/middleware";

// 🔹 로그인한 유저의 ID를 외부에서 받아오게 설계
export const useCalendarStore = (userId = "guest") =>
  create(
    persist(
      (set, get) => ({
        events: [],

        addEvent: (event) =>
          set((state) => ({
            events: [...state.events, { id: Date.now(), ...event }],
          })),

        removeEvent: (id) =>
          set((state) => ({
            events: state.events.filter((e) => e.id !== id),
          })),

        clearEvents: () => set({ events: [] }),
      }),
      {
        // ✅ 사용자별로 로컬스토리지 구분
        name: `calendar-events-${userId}`,
        getStorage: () => localStorage,
      }
    )
  );
