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
        console.log("API response fetchDailyReservations:", response);

        // 데이터 Transform 실시
        const reservationEvents = transformReservationsToEvents(
          response?.data || []
        );

        // 회원 이름으로 구성된 열 생성
        const uniqueNameColumns = [
          ...new Set(reservationEvents.map((item) => item.title)),
        ];

        const resources = uniqueNameColumns.map((name, index) => ({
          id: `resource-${index}`,
          title: name,
        }));

        calendarInstance.current.setOption("resources", resources);

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
