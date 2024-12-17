import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

export const calendarSetup = (
  calendarRef: React.RefObject<HTMLDivElement>,
  setClickedDate: React.Dispatch<React.SetStateAction<string>>,
  setShowMiniCalendar: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!calendarRef.current) return null;

  const calendar = new Calendar(calendarRef.current, {
    // Set library plugins and initial View
    plugins: [resourceTimeGridPlugin, dayGridPlugin],
    initialView: "resourceTimeGridDay",

    // default basic setting
    timeZone: "local",

    // Set calendar resources
    resources: [
      { id: "1", title: "회원1" },
      { id: "2", title: "회원2" },
      { id: "3", title: "회원3" },
      { id: "4", title: "회원4" },
    ],

    // Set event items
    events: [],
    eventBackgroundColor: "#FBD288",
    eventTextColor: "#000000",
    eventClick: function (info) {
      console.log("---------info", info);
      const eventObj = info.event;
      const user = eventObj?.title;
      const startDate = eventObj?.start;
      const endDate = eventObj?.end;

      // setClickedEvent({ user, startDate, endDate });
      console.log("user/startDate/endDate", user, startDate, endDate);
    },

    // default design setting
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

    // Set customTitle button based on currentDate
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
