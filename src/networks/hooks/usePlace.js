// src/hooks/queries/placeQueries.js

import { useQuery,useMutation } from "@tanstack/react-query";
import {
  getPopularPlaces,
  getPlacesByRegion,
  getPlaceDetail,
  saveBookmarkedPlace,
  getBookmarkedPlaces,
  deleteBookmarkedPlace,
  searchPlaces, // ⭐ 추가
} from "../apis/placeApi";
import { useProfileStore } from "../../store/profileStore";


// 인기 장소 조회
export const usePopularPlacesQuery = (category) =>
  useQuery({
    queryKey: ["popularPlaces", category],
    queryFn: () => getPopularPlaces(category),
    staleTime: 1000 * 60 * 5,
  });

// 지역 + 자치구 장소 조회
export const usePlacesByRegionQuery = ({ regionCode, district, category }) =>
  useQuery({
    queryKey: ["placesByRegion", regionCode, district, category],
    queryFn: () => getPlacesByRegion({ regionCode, district, category }),
    enabled: !!regionCode,
    staleTime: 1000 * 60 * 5,
  });

//  장소 상세 조회
export const usePlaceDetailQuery = (placeId) =>
  useQuery({
    queryKey: ["placeDetail", placeId],
    queryFn: () => getPlaceDetail(placeId),
    enabled: !!placeId,
  });

/* 장소 저장 */
export const useSavePlaceMutation = () =>
  useMutation({
    mutationFn: (placeData) => saveBookmarkedPlace(placeData),
  });

/* 장소 저장 해제 */
export const useDeletePlaceMutation = () =>
  useMutation({
    mutationFn: (bookmarkedPlaceId) => deleteBookmarkedPlace(bookmarkedPlaceId),
  });

  /* 찜한 장소 목록 조회 */
  export const useBookmarkedPlacesQuery = () => {
    const userId = useProfileStore((s) => s.userId);
    const isLoggedIn = !!userId;
  
    return useQuery({
      queryKey: ["bookmarkedPlaces"],
      queryFn: getBookmarkedPlaces,
      enabled: isLoggedIn,          // ⭐ 핵심 한 줄
      staleTime: 1000 * 60 * 5,
    });
  };
  
/* -----------------------
   장소 검색 (상단 검색)
------------------------ */
export const useSearchPlacesQuery = (keyword) =>
  useQuery({
    queryKey: ["searchPlaces", keyword],
    queryFn: () => searchPlaces(keyword),
    enabled: !!keyword && keyword.trim().length > 0, // ⭐ 더 안전
    staleTime: 1000 * 60 * 3,
    retry: 1, // ⭐ 에러 시 1번만 재시도
  });