import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export default function transformNextTimeReservation(
  nextStartTime: string,
  nextEndTime: string,
  response: any[]
) {
  // nextStartTime과 nextEndTime을 dayjs 객체로 변환
  const nextStart = dayjs(nextStartTime);
  const nextEnd = dayjs(nextEndTime);

  return response
    .filter((res) => {
      const cusStartTime = dayjs(res?.startTime);
      const cusEndTime = dayjs(res?.endTime);
      return (
        cusStartTime.isBetween(nextStart, nextEnd, null, "[]") ||
        cusEndTime.isBetween(nextStart, nextEnd, null, "[]")
      );
    })
    .map((res) => {
      const cusStartTime = dayjs(res?.startTime);
      const cusEndTime = dayjs(res?.endTime);
      return {
        resourceId: res.reservationsId,
        name: res.name,
        startTime: cusStartTime.format("HH:mm"),
        endTime: cusEndTime.format("HH:mm"),
      };
    });
}
