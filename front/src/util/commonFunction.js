export const BASE_URL = "https://www.rebu.kro.kr";
export const BASE_IMG_URL = "https://www.rebu.kro.kr/data";

export function formatDateTime(dateString) {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 연, 월, 일, 시간, 분 가져오기
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // 오전/오후 판단
  const period = hours >= 12 ? "오후" : "오전";

  // 12시간제로 변환 (0시를 12시로 표현)
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  // 변환된 문자열 생성
  return `${year}년 ${month}월 ${day}일 ${period} ${hours}시 ${minutes}분`;
}
