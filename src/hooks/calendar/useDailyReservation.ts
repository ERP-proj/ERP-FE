import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { loadReservation } from "@/api/reservation/loadReservation";

dayjs.extend(utc);

export const useReservations = (date: string, calendarInstance: any) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        await loadReservation(date, calendarInstance);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error("Error loading reservations:", err.message);
        }
      }
    };

    fetchReservations();
  }, [date, calendarInstance]);

  return { error };
};
