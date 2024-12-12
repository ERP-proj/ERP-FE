import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

export const initializeCalendar = (
  calendarRef: React.RefObject<HTMLDivElement>,
  setClickedDate: React.Dispatch<React.SetStateAction<string>>,
  setShowMiniCalendar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!calendarRef.current) return null;

  const calendar = new Calendar(calendarRef.current, {
    timeZone: "local",
    plugins: [resourceTimeGridPlugin, dayGridPlugin],
    initialView: "resourceTimeGridDay",
    nowIndicator: true,
    headerToolbar: {
      left: "today",
      center: "prev, customTitle, next",
      right: "resourceTimeGridDay, timeGridWeek, dayGridMonth",
    },
    titleFormat: {
      month: "2-digit",
      day: "2-digit",
    },
    contentHeight: 1000,
    customButtons: {
      customTitle: {
        text: "",
        click: () => setShowMiniCalendar((prev) => !prev),
      },
    },
    resources: [
      { id: "1", title: "회원1" },
      { id: "2", title: "회원2" },
      { id: "3", title: "회원3" },
      { id: "4", title: "회원4" },
    ],

    datesSet: (info) => {
      const currentDate = info.view.calendar
        ?.getDate()
        ?.toISOString()
        ?.slice(0, 10);

      if (currentDate) {
        setClickedDate(currentDate);
      }

      const customTitleButton = calendarRef.current?.querySelector(
        ".fc-customTitle-button.fc-button.fc-button-primary"
      );

      if (customTitleButton) {
        customTitleButton.textContent = currentDate;
      }

      if (currentDate) {
        setClickedDate(currentDate);
      }
    },
  });

  calendar.render();
  return calendar;
};
