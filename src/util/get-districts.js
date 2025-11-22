// =========================
// 인천 이미지 import
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

// =========================
// 인천 9개 데이터
// =========================
export const INCHEON_DISTRICTS = [
  { id: 1, name: "동구·중구", img: incheon_1, type: "default" },
  { id: 2, name: "서구·계양구", img: incheon_2, type: "default" },
  { id: 3, name: "동인천", img: incheon_3, type: "default" },
  { id: 4, name: "미추홀구", img: incheon_4, type: "default" },
  { id: 5, name: "부평구", img: incheon_5, type: "default" },
  { id: 6, name: "연수구", img: incheon_6, type: "default" },
  { id: 7, name: "남동구", img: incheon_7, type: "default" },
  { id: 8, name: "송도", img: incheon_8, type: "default" },
  { id: 9, name: "영종도", img: incheon_9, type: "default" },
];

  
  // -------------------------
  // 서울 9개 (대표 자치구 9개 선정)
  // -------------------------
  export const SEOUL_DISTRICTS = [
    { id: 1, name: "강남구", img: "/images/seoul/gangnam.png", type: "default" },
    { id: 2, name: "홍대(마포구)", img: "/images/seoul/hongdae.png", type: "default" },
    { id: 3, name: "종로구", img: "/images/seoul/jongno.png", type: "default" },
    { id: 4, name: "용산구", img: "/images/seoul/yongsan.png", type: "default" },
    { id: 5, name: "송파구", img: "/images/seoul/songpa.png", type: "default" },
    { id: 6, name: "강동구", img: "/images/seoul/gangdong.png", type: "default" },
    { id: 7, name: "영등포구", img: "/images/seoul/yeongdeungpo.png", type: "default" },
    { id: 8, name: "서초구", img: "/images/seoul/seocho.png", type: "default" },
    { id: 9, name: "성동구", img: "/images/seoul/seongdong.png", type: "default" },
  ];
  
  // -------------------------
  // 경기 9개 (대표 도시 9개 선정)
  // -------------------------
  export const GYEONGGI_DISTRICTS = [
    { id: 1, name: "수원시", img: "/images/gyeonggi/suwon.png", type: "default" },
    { id: 2, name: "용인시", img: "/images/gyeonggi/yongin.png", type: "default" },
    { id: 3, name: "성남시", img: "/images/gyeonggi/seongnam.png", type: "default" },
    { id: 4, name: "고양시", img: "/images/gyeonggi/goyang.png", type: "default" },
    { id: 5, name: "부천시", img: "/images/gyeonggi/bucheon.png", type: "default" },
    { id: 6, name: "화성시", img: "/images/gyeonggi/hwaseong.png", type: "default" },
    { id: 7, name: "안양시", img: "/images/gyeonggi/anyang.png", type: "default" },
    { id: 8, name: "일산(고양)", img: "/images/gyeonggi/ilsan.png", type: "default" },
    { id: 9, name: "평택시", img: "/images/gyeonggi/pyeongtaek.png", type: "default" },
  ];
  
  // -------------------------
  // 전체 Export 묶음
  // -------------------------
  export default {
    INCHEON_DISTRICTS,
    SEOUL_DISTRICTS,
    GYEONGGI_DISTRICTS,
  };
  