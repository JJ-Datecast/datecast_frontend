// =========================
// 더미 이미지(인천 이미지 통일)
// =========================
import incheon_1 from "../assets/region/district/incheon/1.png";
import incheon_2 from "../assets/region/district/incheon/2.png";
import incheon_3 from "../assets/region/district/incheon/3.png";
import incheon_4 from "../assets/region/district/incheon/4.png";
import incheon_5 from "../assets/region/district/incheon/5.png";
import incheon_6 from "../assets/region/district/incheon/6.png";
import incheon_7 from "../assets/region/district/incheon/7.png";
import incheon_8 from "../assets/region/district/incheon/8.png";
import incheon_9 from "../assets/region/district/incheon/8.png";


import seoul_1 from "../assets/region/district/seoul/SEOUL_1.png";
import seoul_2 from "../assets/region/district/seoul/SEOUL_2.png";
import seoul_3 from "../assets/region/district/seoul/SEOUL_3.png";
import seoul_4 from "../assets/region/district/seoul/SEOUL_4.png";
import seoul_5 from "../assets/region/district/seoul/SEOUL_5.png";
import seoul_6 from "../assets/region/district/seoul/SEOUL_6.png";
import seoul_7 from "../assets/region/district/seoul/SEOUL_7.png";
import seoul_8 from "../assets/region/district/seoul/SEOUL_8.png";
import seoul_9 from "../assets/region/district/seoul/SEOUL_9.png";




// 편의를 위해 모든 지역이 같은 이미지를 사용
const dummyImg = incheon_1;

// =========================
// 인천 9개 데이터 (apiDistrict 매핑 포함)
// =========================
export const INCHEON_DISTRICTS = [
  { id: 1, name: "동구·중구", apiDistrict: "중구", img: incheon_1, regionCode: "INCHEON" },
  { id: 2, name: "서구·계양구", apiDistrict: "서구", img: incheon_2, regionCode: "INCHEON" },
  { id: 3, name: "동인천", apiDistrict: "중구", img: incheon_3, regionCode: "INCHEON" },
  { id: 4, name: "미추홀구", apiDistrict: "미추홀구", img: incheon_4, regionCode: "INCHEON" },
  { id: 5, name: "부평구", apiDistrict: "부평구", img: incheon_5, regionCode: "INCHEON" },
  { id: 6, name: "연수구", apiDistrict: "연수구", img: incheon_6, regionCode: "INCHEON" },
  { id: 7, name: "남동구", apiDistrict: "남동구", img: incheon_7, regionCode: "INCHEON" },
  { id: 8, name: "송도", apiDistrict: "연수구", img: incheon_8, regionCode: "INCHEON" },
  { id: 9, name: "영종도", apiDistrict: "중구", img: incheon_9, regionCode: "INCHEON" },
];

// =========================
// 서울 9개 (apiDistrict = UI name 그대로)
// =========================
export const SEOUL_DISTRICTS = [
  { id: 1, name: "강남구", apiDistrict: "강남구", img: seoul_1, regionCode: "SEOUL" },
  { id: 2, name: "홍대(마포구)", apiDistrict: "마포구", img: seoul_2, regionCode: "SEOUL" },
  { id: 3, name: "종로구", apiDistrict: "종로구", img: seoul_3, regionCode: "SEOUL" },
  { id: 4, name: "용산구", apiDistrict: "용산구", img: seoul_4, regionCode: "SEOUL" },
  { id: 5, name: "송파구", apiDistrict: "송파구", img: seoul_5, regionCode: "SEOUL" },
  { id: 6, name: "강동구", apiDistrict: "강동구", img: seoul_6, regionCode: "SEOUL" },
  { id: 7, name: "영등포구", apiDistrict: "영등포구", img: seoul_7, regionCode: "SEOUL" },
  { id: 8, name: "서초구", apiDistrict: "서초구", img: seoul_8, regionCode: "SEOUL" },
  { id: 9, name: "성동구", apiDistrict: "성동구", img: seoul_9, regionCode: "SEOUL" },
];

// =========================
// 경기 9개 (apiDistrict = UI name 그대로)
// =========================
export const GYEONGGI_DISTRICTS = [
  { id: 1, name: "수원시", apiDistrict: "수원시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 2, name: "용인시", apiDistrict: "용인시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 3, name: "성남시", apiDistrict: "성남시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 4, name: "고양시", apiDistrict: "고양시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 5, name: "부천시", apiDistrict: "부천시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 6, name: "화성시", apiDistrict: "화성시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 7, name: "안양시", apiDistrict: "안양시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 8, name: "일산(고양)", apiDistrict: "고양시", img: dummyImg, regionCode: "GYEONGGI" },
  { id: 9, name: "평택시", apiDistrict: "평택시", img: dummyImg, regionCode: "GYEONGGI" },
];

// =========================
// 전체 Export
// =========================
export default {
  INCHEON_DISTRICTS,
  SEOUL_DISTRICTS,
  GYEONGGI_DISTRICTS,
};
