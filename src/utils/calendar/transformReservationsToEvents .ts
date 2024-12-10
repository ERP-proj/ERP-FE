import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const transformReservationsToEvents = (reservations: any[], date: string) => {
  return reservations.map((res) => {
    console.log("Processing reservation:", res);

    const startTime = dayjs(date)
      .hour(res.startTime?.hour || 0)
      .minute(res.startTime?.minute || 0)
      .second(res.startTime?.second || 0)
      .toISOString();

    const endTime = dayjs(date)
      .hour(res.endTime?.hour || 0)
      .minute(res.endTime?.minute || 0)
      .second(res.endTime?.second || 0)
      .toISOString();

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    return {
      id: res.reservationsId,
      title: `${res.name} - Seat ${res.seatNumber}`,
      start: startTime,
      end: endTime,
    };
  });
};

export default transformReservationsToEvents;
