import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function transformReservationsToEvents(reservations: any[]) {
  return reservations.map((res) => {
    const startTime = res?.startTime;
    const endTime = res?.endTime;

    return {
      title: `${res.name}`,
      start: startTime,
      end: endTime,
      resourceId: `SeatNumber${res.seatNumber}`,
      id: `SeatNumber${res.seatNumber}`,
      extendedProps: {
        reservationId: `${res.reservationId}`,
      },
    };
  });
}
