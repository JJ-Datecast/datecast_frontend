// src/api/placeApi.js

import apiClient from "../../networks/client/apiClient";
import publicApi from "../../networks/client/publicApi";

const BASE_URL = "/api";  // apiClient가 baseURL을 이미 들고 있으므로 상대경로 사용 가능


/* 인기 장소 */
export const getPopularPlaces = async (category) => {
  const res = await publicApi.get("/api/places/popular", {
    params: { category },
  });
  return res.data;
};

/* 장소 상세 */
export const getPlaceDetail = async (placeId) => {
  const res = await publicApi.get(`/api/places/${placeId}`);
  return res.data;
};




/* -----------------------
   지역별 장소 조회
------------------------ */
export const getPlacesByRegion = async ({ regionCode, district, category }) => {
  const res = await apiClient.get(
    `${BASE_URL}/regions/${regionCode}/places`,
    {
      params: { district, category },
    }
  );
  return res.data;
};



/* -----------------------
   장소 저장 (북마크 추가)
   POST /api/bookmarked-places
------------------------ */
export const saveBookmarkedPlace = async (placeData) => {
  const res = await apiClient.post(
    `${BASE_URL}/bookmarked-places`,
    placeData
  );
  return res.data;  // { bookmarkedPlaceId: number }
};

/* -----------------------
   장소 저장 삭제 (북마크 해제)
   DELETE /api/bookmarked-places/{id}
------------------------ */
export const deleteBookmarkedPlace = async (bookmarkedPlaceId) => {
  await apiClient.delete(
    `${BASE_URL}/bookmarked-places/${bookmarkedPlaceId}`
  );
  return true;
};

/* -----------------------
   저장된 장소 목록 조회
   GET /api/bookmarked-places
------------------------ */
export const getBookmarkedPlaces = async () => {
  console.log("📡 GET /bookmarked-places 요청 보냄");    // <- 여기
  const res = await apiClient.get(`${BASE_URL}/bookmarked-places`);
  console.log("✅ GET /bookmarked-places 응답:", res.data);  // <- 여기
  return res.data;
};


/* -----------------------
   장소 검색 (상단 검색)
   GET /api/search/places?keyword=
------------------------ */
export const searchPlaces = async (keyword) => {
  if (!keyword) return [];

  console.log("🔍 searchPlaces 호출됨, keyword =", keyword);

  const res = await apiClient.get("/api/search/places", {
    params: {
      keyword: keyword.trim(), // ⭐ 공백 제거
    },
  });

  console.log("✅ searchPlaces 응답 데이터:", res.data);

  // Swagger 기준: 배열 그대로 반환
  return Array.isArray(res.data) ? res.data : [];
};