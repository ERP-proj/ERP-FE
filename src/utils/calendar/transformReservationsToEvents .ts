import dayjs from "dayjs";

const transformReservationsToEvents = (reservations: any[], date: string) => {
  return reservations.map((res) => ({
    id: res.reservationsId,
    title: `${res.name} - Seat ${res.seatNumber}`,
    start: dayjs(date)
      .hour(res.startTime.hour)
      .minute(res.startTime.minute)
      .second(res.startTime.second)
      .toISOString(),
    end: dayjs(date)
      .hour(res.endTime.hour)
      .minute(res.endTime.minute)
      .second(res.endTime.second)
      .toISOString(),
  }));
};

export default transformReservationsToEvents;
