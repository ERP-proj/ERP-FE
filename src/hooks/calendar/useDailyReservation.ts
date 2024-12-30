import { useState, useEffect } from "react";
import { fetchDailyReservations } from "@/api/reservation/fetchDailyReservations";
import transformReservationsToEvents from "@/utils/calendar/transformReservationsToEvents ";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { colorList } from "@/utils/calendar/colorList";

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

        // 이벤트에 랜덤 색상 추가
        const eventWithRandomColors = reservationEvents.map((event) => {
          const randomColor =
            colorList[Math.floor(Math.random() * colorList.length)];
          return {
            ...event,
            backgroundColor: randomColor,
            borderColor: randomColor,
          };
        });

        // 회원 이름으로 구성된 열 생성
        const uniqueNameColumns = [
          ...new Set(reservationEvents.map((item) => item.title)),
        ];

        // resources의 id와 event의 resourceId를 회원 이름으로 매핑
        // fullCalendar 라이브러리가 알아볼 수 있도록 함.

        // unique한 회원 이름으로 구성된 columnList 생성
        const columnList = uniqueNameColumns.map((name) => ({
          id: name,
          title: name,
        }));

        console.log(calendarInstance.current);
        console.log(Object.getOwnPropertyNames(calendarInstance.current));

        if (calendarInstance.current) {
          // 기존 이벤트 삭제 및 리소스 정의 및 새로운 이벤트 추가
          calendarInstance.current.removeAllEvents();
          calendarInstance.current.setOption("resources", columnList);
          calendarInstance.current.addEventSource(eventWithRandomColors);
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
