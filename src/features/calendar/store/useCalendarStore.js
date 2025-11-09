import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCalendarStore = (userId = "guest") =>
  create(
    persist(
      (set, get) => ({
        events: [],

        addEvent: (event) =>
          set((state) => ({
            events: [...state.events, { id: Date.now(), ...event }],
          })),

        deleteEvent: (id) =>
          set((state) => ({
            events: state.events.filter((event) => event.id !== id),
          })),

        
        updateEvent: (updated) =>
          set((state) => ({
            events: state.events.map((event) =>
              event.id === updated.id ? { ...event, ...updated } : event
            ),
          })),

        clearEvents: () => set({ events: [] }),
      }),
      {
        name: `calendar-events-${userId}`,
        getStorage: () => localStorage,
      }
    )
  );
