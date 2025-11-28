// src/api/placeApi.js

const BASE_URL = "https://datecast.site/api";

/* -----------------------
   인기 장소 조회
------------------------ */
export const getPopularPlaces = async (category) => {
  const url = category
    ? `${BASE_URL}/places/popular?category=${category}`
    : `${BASE_URL}/places/popular`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("인기 장소 API 실패");

  return response.json();
};

/* -----------------------
   지역별 장소 조회
   GET /regions/{regionCode}/places?district=..&category=..
------------------------ */
export const getPlacesByRegion = async ({ regionCode, district, category }) => {
  const url = new URL(`${BASE_URL}/regions/${regionCode}/places`);

  if (district) url.searchParams.append("district", district);
  if (category) url.searchParams.append("category", category);

  const response = await fetch(url);

  if (!response.ok) throw new Error("지역별 장소 리스트 조회 실패");

  return response.json();
};
/* -----------------------
   장소 상세 조회
   GET /places/{placeId}
------------------------ */
export const getPlaceDetail = async (placeId) => {
  const response = await fetch(`${BASE_URL}/places/${placeId}`);
  if (!response.ok) throw new Error("장소 상세 조회 실패");

  return response.json();
};
