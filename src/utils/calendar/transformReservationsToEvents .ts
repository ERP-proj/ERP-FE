import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const transformReservationsToEvents = (reservations: any[], date: string) => {
  return reservations.map((res) => {
    const startTime = res?.startTime;
    const isoStartTime = new Date(`2024-12-02T${startTime}:00Z`)?.toISOString();

    const endTime = res?.endTime;
    const isoEndTime = new Date(`2024-12-02T${endTime}:00Z`)?.toISOString();

    // console.log("******************");
    // console.log("TimeAPI", startTime, "~~", endTime);
    // console.log("isoString", isoStartTime, "~~", isoEndTime);

    return {
      resourceId: res.reservationsId,
      title: `${res.name}`,
      start: isoStartTime,
      end: isoEndTime,
    };
  });
};

export default transformReservationsToEvents;
