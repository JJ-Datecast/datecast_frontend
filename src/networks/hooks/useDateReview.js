import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDateReviews,
  postDateReview,
  getDateReviewDetail,
  deleteDateReview,
  patchDateReview,
} from "../apis/dateReviewApi";

/* -----------------------------
   1) 데이트 후기 리스트 조회
----------------------------- */
export const useDateReviewsQuery = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["dateReviews", page, size],
    queryFn: () => getDateReviews(page, size),
  });
};

/* -----------------------------
   2) 데이트 후기 상세 조회
----------------------------- */
export const useDateReviewDetailQuery = (dateReviewId) => {
  return useQuery({
    queryKey: ["dateReviewDetail", dateReviewId],
    queryFn: () => getDateReviewDetail(dateReviewId),
    enabled: !!dateReviewId,
  });
};

/* -----------------------------
   3) 데이트 후기 작성
----------------------------- */
export const useCreateDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["dateReviews"]);
    },
  });
};

/* -----------------------------
   4) 데이트 후기 삭제
----------------------------- */
export const useDeleteDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["dateReviews"]);
    },
  });
};

/* -----------------------------
   5) 데이트 후기 수정
----------------------------- */
export const useUpdateDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchDateReview,
    onSuccess: (_, { dateReviewId }) => {
      queryClient.invalidateQueries(["dateReviews"]);
      queryClient.invalidateQueries(["dateReviewDetail", dateReviewId]);
    },
  });
};
