import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const transformReservationsToEvents = (reservations: any[]) => {
  return reservations.map((res) => {
    const startTime = res?.startTime;
    const endTime = res?.endTime;

    return {
      resourceId: res.reservationsId,
      title: `${res.name}`,
      start: startTime,
      end: endTime,
    };
  });
};

export default transformReservationsToEvents;
