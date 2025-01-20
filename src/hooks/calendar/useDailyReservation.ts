import { useState, useEffect } from "react";
import transformReservationsToEvents from "@/utils/calendar/transformReservationsToEvents ";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { colorList } from "@/utils/calendar/colorList";
import fetchDailyReservations from "@/api/reservation/fetchDailyReservations";

dayjs.extend(utc);

export const useReservations = (date: string, calendarInstance: any) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resourceColorMap: { [key: string]: string } = {};

    if (!date || !calendarInstance.current) return;

    const loadReservation = async () => {
      try {
        // response 받아오기
        const response = await fetchDailyReservations(date);

        // 데이터 Transform 실시
        const reservationEvents = transformReservationsToEvents(
          response?.data || []
        );

        // 이벤트에 랜덤 색상 추가
        const eventWithColors = reservationEvents.map((event) => {
          // resourceId가 없으면 색상 할당
          if (!resourceColorMap[event.resourceId]) {
            // 색상 목록에서 랜덤 색상 선택
            const randomColor =
              colorList[Math.floor(Math.random() * colorList.length)];
            resourceColorMap[event.resourceId] = randomColor;
          }

          // resourceId에 매핑된 색상을 사용
          const color = resourceColorMap[event.resourceId];

          return {
            ...event,
            backgroundColor: color,
            borderColor: color,
          };
        });

        console.log("data after modify----", eventWithColors);

        if (calendarInstance.current) {
          // 기존 이벤트 삭제 및 리소스 정의 및 새로운 이벤트 추가
          calendarInstance.current.removeAllEvents();
          calendarInstance.current.addEventSource(eventWithColors);
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
