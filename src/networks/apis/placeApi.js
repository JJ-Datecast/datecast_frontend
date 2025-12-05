// src/api/placeApi.js

import apiClient from "../../networks/client/apiClient";

const BASE_URL = "/api";  // apiClient가 baseURL을 이미 들고 있으므로 상대경로 사용 가능

/* -----------------------
   인기 장소 조회
------------------------ */
export const getPopularPlaces = async (category) => {
  const url = category
    ? `${BASE_URL}/places/popular?category=${category}`
    : `${BASE_URL}/places/popular`;

  const res = await apiClient.get(url);
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
   장소 상세 조회
------------------------ */
export const getPlaceDetail = async (placeId) => {
  const res = await apiClient.get(`${BASE_URL}/places/${placeId}`);
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


