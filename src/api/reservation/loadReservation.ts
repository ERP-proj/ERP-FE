import { getDailyReservations } from "./getDailyReservations";
import transformReservationsToEvents from "@/utils/calendar/transformReservationsToEvents ";
import { colorList } from "@/utils/calendar/colorList";

export const loadReservation = async (date: string, calendarInstance: any) => {
  if (!date || !calendarInstance.current) return;

  const resourceColorMap: { [key: string]: string } = {};

  try {
    const response = await getDailyReservations(date);

    const reservationEvents = transformReservationsToEvents(
      response?.data || []
    );

    const eventWithColors = reservationEvents.map((event) => {
      if (!resourceColorMap[event.resourceId]) {
        const randomColor =
          colorList[Math.floor(Math.random() * colorList.length)];
        resourceColorMap[event.resourceId] = randomColor;
      }

      const color = resourceColorMap[event.resourceId];

      return {
        ...event,
        backgroundColor: color,
        borderColor: color,
      };
    });

    console.log("data after modify----", eventWithColors);

    console.log("calendarInstance.current:", calendarInstance.current);
    if (!calendarInstance.current) {
      console.error("calendarInstance.current가 존재하지 않습니다!");
      return;
    }

    if (!calendarInstance.current.removeAllEvents) {
      console.error(
        "calendarInstance.current가 FullCalendar 인스턴스가 아닙니다!",
        calendarInstance.current
      );
      return;
    }

    if (calendarInstance.current) {
      calendarInstance.current.removeAllEvents();
      calendarInstance.current.addEventSource(eventWithColors);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error loading reservations:", err.message);
      throw err;
    }
  }
};
