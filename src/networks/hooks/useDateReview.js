
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDateReview,
  getDateReviews,
  getDateReviewDetail,
  updateDateReview,
  deleteDateReview,
} from "../apis/dateReviewApi";

export const useCreateDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dateReviews"] });
    },
  });
};

export const useDateReviewsQuery = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["dateReviews", page, size],
    queryFn: () => getDateReviews(page, size),
  });
};


export const useDateReviewDetailQuery = (reviewId) => {
  return useQuery({
    queryKey: ["dateReviewDetail", reviewId],
    queryFn: () => getDateReviewDetail(reviewId),
    enabled: !!reviewId,
  });
};

export const useUpdateDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateReviewId, payload, image }) =>
      updateDateReview({ dateReviewId, payload, image }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dateReviews"] });
      queryClient.invalidateQueries({
        queryKey: ["dateReviewDetail", variables.dateReviewId],
      });
    },

    onError: (err) => {
      alert("후기 수정에 실패했습니다.");
      console.error(err);
    },
  });
};

export const useDeleteDateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDateReview,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["dateReviews"] });
    },
  });
};
