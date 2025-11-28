// src/networks/apis/scheduleApi.js
import apiClient from "../client/apiClient";

// 📌 일정 목록 조회 (년/월 기준)
export const getSchedules = ({ year, month }) =>
  apiClient.get("/api/schedules", {
    params: { year, month },
  });

// 📌 일정 상세 조회
export const getScheduleById = (id) =>
  apiClient.get(`/api/schedules/${id}`);

// 📌 일정 생성
export const createSchedule = (body) =>
  apiClient.post("/api/schedules", body);

// 📌 일정 수정
export const updateSchedule = ({ id, body }) =>
  apiClient.patch(`/api/schedules/${id}`, body);


// 📌 일정 삭제
export const deleteSchedule = (id) =>
  apiClient.delete(`/api/schedules/${id}`);
