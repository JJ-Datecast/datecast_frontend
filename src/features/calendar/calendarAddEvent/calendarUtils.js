// 오늘 날짜를 YYYY-MM-DD 형식으로 반환 (진짜 로컬 기준)
export function toLocalDateStr(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 현재 시각을 30분 단위로 반올림
export function roundNowTo30() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const rh = m < 30 ? h : (h + 1) % 24;
  const rm = m < 30 ? "30" : "00";
  return `${String(rh).padStart(2, "0")}:${rm}`;
}

//  HH:MM → +1시간 (24시 넘으면 00시)
export function add1h(time) {
  const [hh, mm] = time.split(":").map(Number);
  const nh = (hh + 1) % 24;
  return `${String(nh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
