// src/hooks/queries/placeQueries.js

import { useQuery } from "@tanstack/react-query";
import {
  getPopularPlaces,
  getPlacesByRegion,
  getPlaceDetail,
} from "../apis/placeApi";

// ⭐ 인기 장소 조회
export const usePopularPlacesQuery = (category) =>
  useQuery({
    queryKey: ["popularPlaces", category],
    queryFn: () => getPopularPlaces(category),
    staleTime: 1000 * 60 * 5,
  });

// ⭐ 지역 + 자치구 장소 조회
export const usePlacesByRegionQuery = ({ regionCode, district, category }) =>
  useQuery({
    queryKey: ["placesByRegion", regionCode, district, category],
    queryFn: () => getPlacesByRegion({ regionCode, district, category }),
    enabled: !!regionCode,
    staleTime: 1000 * 60 * 5,
  });

// ⭐ 장소 상세 조회
export const usePlaceDetailQuery = (placeId) =>
  useQuery({
    queryKey: ["placeDetail", placeId],
    queryFn: () => getPlaceDetail(placeId),
    enabled: !!placeId,
  });
