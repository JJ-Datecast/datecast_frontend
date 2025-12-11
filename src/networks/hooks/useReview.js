// src/networks/hooks/useReview.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlaceReviews,
  postPlaceReview,
  verifyPlaceReview,
  getPlaceReviewDetail,
  deletePlaceReview,
  patchPlaceReview,
} from "../../networks/apis/reviewApi";

/* -----------------------------
   1) 장소 후기 리스트 조회
----------------------------- */
export const usePlaceReviewsQuery = () => {
  return useQuery({
    queryKey: ["placeReviews"],
    queryFn: getPlaceReviews,
  });
};

/* -----------------------------
   2) 장소 후기 상세 조회
----------------------------- */
export const usePlaceReviewDetailQuery = (reviewId) => {
  return useQuery({
    queryKey: ["placeReviewDetail", reviewId],
    queryFn: () => getPlaceReviewDetail(reviewId),
    enabled: !!reviewId,
  });
};

/* -----------------------------
   3) 후기 작성 Mutation
----------------------------- */
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlaceReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["placeReviews"]);
    },
  });
};

/* -----------------------------
   4) 방문 인증 Mutation (GPS 인증)
----------------------------- */
export const useVerifyReviewMutation = () => {
  return useMutation({
    mutationFn: verifyPlaceReview,
  });
};

/* -----------------------------
   5) 후기 삭제 Mutation
----------------------------- */
export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlaceReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["placeReviews"]);
    },
  });
};

/* -----------------------------
   6) 후기 수정 Mutation
----------------------------- */
export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPlaceReview,
    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries(["placeReviews"]);
      queryClient.invalidateQueries(["placeReviewDetail", reviewId]);
    },
  });
};
