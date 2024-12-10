import { useState, useEffect } from "react";
import { fetchDailyReservations } from "@/api/reservation/fetchDailyReservations";
import transformReservationsToEvents from "../../../utils/reservation/transformReservationsToEvents ";

export const useReservations = (date: string, calendarInstance: any) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date || !calendarInstance.current) return;

    const loadReservation = async () => {
      try {
        const response = await fetchDailyReservations(date);
        const reservationEvents = transformReservationsToEvents(
          response.data || [],
          date
        );
        calendarInstance.current?.removeAllEventSources();
        calendarInstance.current?.addEventSource(reservationEvents);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    loadReservation();
  }, [date, calendarInstance]);

  return { error };
};
