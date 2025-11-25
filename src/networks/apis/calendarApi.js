// calendarApi.js
import apiClient from "../client/apiClient";

export const getEvents = () => apiClient.get("/calendar/events");

export const getEventDetail = (id) =>
  apiClient.get(`/calendar/events/${id}`);

export const createEvent = (payload) =>
  apiClient.post("/calendar/events", payload);

export const updateEvent = (id, payload) =>
  apiClient.put(`/calendar/events/${id}`, payload);

export const deleteEvent = (id) =>
  apiClient.delete(`/calendar/events/${id}`);
