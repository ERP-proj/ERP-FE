import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { reverseTimeMapping } from "../reservation/timeMapping";

dayjs.extend(utc);

export default function transformReservationsToEvents(reservations: any[]) {
  return reservations.map((res) => {
    const startTime = res?.startIndex;
    const endTime = res?.endIndex;

    return {
      title: `${res.name}`,
      start: `${res?.reservationDate}T${reverseTimeMapping[startTime]}`,
      end: `${res?.reservationDate}T${reverseTimeMapping[endTime]}`,
      resourceId: `${res.seatNumber}`,
      id: `${res.seatNumber}`,
      extendedProps: {
        reservationId: `${res.reservationId}`,
      },
    };
  });
}
