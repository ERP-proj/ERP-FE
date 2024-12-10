import { useState, useEffect } from "react";
import { fetchDailyReservations } from "@/api/reservation/fetchDailyReservations";
import transformReservationsToEvents from "@/utils/calendar/transformReservationsToEvents ";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const useReservations = (date: string, calendarInstance: any) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("--------Date changed----------:", date);
    console.log("calendarInstance current:", calendarInstance.current);

    if (!date || !calendarInstance.current) return;

    const loadReservation = async () => {
      try {
        const response = await fetchDailyReservations(date);
        console.log("API response:", response);

        const reservationEvents = transformReservationsToEvents(
          response.data || [],
          date
        );
        console.log("Transformed reservation events:", reservationEvents);

        if (reservationEvents.length === 0) {
          console.log("No events found for the given date.");
        }

        if (calendarInstance.current) {
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
