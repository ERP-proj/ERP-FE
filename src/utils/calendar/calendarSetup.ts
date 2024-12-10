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
      { id: "column1", title: "Student1" },
      { id: "column2", title: "Student2" },
      { id: "column3", title: "Student3" },
      { id: "column4", title: "Student4" },
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

      console.log("calendarRef.current:", calendarRef.current);
      console.log("customTitleButton:", customTitleButton);

      if (customTitleButton) {
        customTitleButton.textContent = currentDate;
        console.log(currentDate);
      } else {
        console.log("eslslsle");
      }

      if (currentDate) {
        setClickedDate(currentDate);
      }
    },
  });

  calendar.render();
  return calendar;
};
