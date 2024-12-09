export function getTimeFromIndex(index: number) {
  // 시작 시간 설정
  const startTime = new Date();
  startTime.setHours(9, 0, 0, 0); // 9:00

  // 30분씩 더하기
  const newTime = new Date(startTime.getTime() + index * 30 * 60 * 1000);

  // 시간 형식 반환 (HH:MM)
  const hours = newTime.getHours().toString().padStart(2, '0');
  const minutes = newTime.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
