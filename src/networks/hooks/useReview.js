import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPlaceReviews,
  postPlaceReview,
  verifyPlaceReview,
  getPlaceReviewDetail,
  deletePlaceReview,
  patchPlaceReview,
  getMyReviews,
} from "../../networks/apis/reviewApi";

/* -----------------------------
   1) 장소 후기 리스트 조회
----------------------------- */
export const usePlaceReviewsQuery = (placeId) => {
  return useQuery({
    queryKey: ["placeReviews", placeId],
    queryFn: () => getPlaceReviews(placeId),
    enabled: !!placeId,
  });
};

/* -----------------------------
   2) 후기 상세 조회
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
export const useCreateReviewMutation = (placeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPlaceReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["placeReviews", placeId]);
    },
  });
};

/* -----------------------------
   4) 방문 인증(GPS)
----------------------------- */
export const useVerifyReviewMutation = () => {
  return useMutation({
    mutationFn: verifyPlaceReview,
  });
};

/* -----------------------------
   5) 후기 삭제
----------------------------- */
export const useDeleteReviewMutation = (placeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlaceReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["placeReviews", placeId]);
    },
  });
};

/* -----------------------------
   6) 후기 수정
----------------------------- */
export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPlaceReview,
    onSuccess: (_, { reviewId, placeId }) => {
      queryClient.invalidateQueries(["placeReviews", placeId]);
      queryClient.invalidateQueries(["placeReviewDetail", reviewId]);
    },
  });
};
/* -----------------------------
   내가 쓴 후기 전체 조회 Query
----------------------------- */
export const useMyReviewsQuery = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["myReviews", page, size],
    queryFn: () => getMyReviews(page, size),
  });
};
