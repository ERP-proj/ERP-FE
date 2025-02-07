/**
 * 날짜 문자열을 yyyy/MM/dd 형식으로 포맷팅
 * @param dateString ISO 날짜 문자열 (예: 2024-12-28T16:07:48.044)
 * @returns 포맷팅된 날짜 문자열 (2024/12/28)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString); // 문자열을 Date 객체로 변환
  const year = date.getFullYear(); // 년도
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(date.getDate()).padStart(2, "0"); // 일

  return `${year}/${month}/${day}`; // yyyy/MM/dd 형식으로 반환
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
