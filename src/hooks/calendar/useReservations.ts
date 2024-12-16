import { useState, useEffect } from "react";
import { fetchDailyReservations } from "@/api/reservation/fetchDailyReservations";
import transformReservationsToEvents from "@/utils/calendar/transformReservationsToEvents ";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const useReservations = (date: string, calendarInstance: any) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date || !calendarInstance.current) return;

    const loadReservation = async () => {
      try {
        // response 받아오기
        const response = await fetchDailyReservations(date);
        console.log("API response:", response);

        // 데이터 Transform 실시
        const reservationEvents = transformReservationsToEvents(
          response?.data || []
        );

        if (calendarInstance.current) {
          console.log("remove 실시---------------");
          calendarInstance.current.getEventSources().forEach((source: any) => {
            source.remove();
          });

          console.log("calendarInstance.current", calendarInstance?.current);

          calendarInstance.current.addEventSource(reservationEvents);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error loading reservations:", err.message);
        }
      }
    };

    loadReservation();
  }, [date, calendarInstance]);

  return { error };
};
