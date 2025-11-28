// src/networks/hooks/useSchedule.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
  getScheduleById,
} from "../apis/scheduleApi";

const SCHEDULE_KEYS = {
  all: (year, month) => ["schedules", year, month],
};

/* ------------------------------------------------------
 * 1) 월별 일정 목록 조회
 * ---------------------------------------------------- */
export const useSchedules = ({ year, month } = {}) => {
  return useQuery({
    queryKey: SCHEDULE_KEYS.all(year, month),
    queryFn: ({ queryKey }) =>
      getSchedules({
        year: queryKey[1],
        month: queryKey[2],
      }).then((res) => res.data),
    enabled: year !== undefined && month !== undefined,
  });
};

/* ------------------------------------------------------
 * 2) 일정 상세 조회 (GET /api/schedules/{id})
 * ---------------------------------------------------- */
export const useScheduleDetail = (id) =>
  useQuery({
    queryKey: ["scheduleDetail", id],
    queryFn: ({ queryKey }) =>
      getScheduleById(queryKey[1]).then((res) => res.data),
    enabled: !!id,
  });

/* ------------------------------------------------------
 * 3) 일정 생성
 * ---------------------------------------------------- */
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

/* ------------------------------------------------------
 * 4) 일정 수정
 * ---------------------------------------------------- */
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

/* ------------------------------------------------------
 * 5) 일정 삭제
 * ---------------------------------------------------- */
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
