import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

export const calendarSetup = (
  calendarRef: React.RefObject<HTMLDivElement>,
  setClickedDate: React.Dispatch<React.SetStateAction<string>>,
  setShowMiniCalendar: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedEvent: React.Dispatch<React.SetStateAction<any>>
) => {
  if (!calendarRef.current) return null;

  // Declare now time
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:00`;

  const calendar = new Calendar(calendarRef.current, {
    // Set library plugins and initial View
    plugins: [resourceTimeGridPlugin, dayGridPlugin, interactionPlugin],
    initialView: "resourceTimeGridDay",
    slotMinTime: "08:00:00",
    slotMaxTime: "22:59:59",
    slotDuration: "00:30:00",
    scrollTime: currentTime,
    expandRows: true,

    // Set drag available
    selectable: true,

    // default basic setting
    timeZone: "local",
    allDaySlot: false,
    slotMinWidth: 30,
    contentHeight: 800,

    // Set calendar resources
    resources: [
      { id: "1", title: "1" },
      { id: "2", title: "2" },
      { id: "3", title: "3" },
      { id: "4", title: "4" },
    ],

    // Set event items
    events: [],
    eventTextColor: "#000000",

    // Set event click Callback
    eventClick: function (info) {
      const eventObj = info.event;
      const userName = eventObj?.title;
      const startDate = eventObj?.start;
      const endDate = eventObj?.end;
      const seatNumber = eventObj?.id;
      const reservationId = eventObj.extendedProps?.reservationId;
      const target = info.jsEvent.target as HTMLElement | null;

      if (target && target.getBoundingClientRect) {
        const rect = target?.getBoundingClientRect();
        const position = {
          top: rect?.top + window?.scrollY + rect?.height / 4,
          left: rect?.left + window?.scrollX + rect?.width * 1.2,
        };

        console.log("clicked event info--------------------");
        console.log(info);

        setSelectedEvent({
          userName,
          seatNumber,
          startDate,
          endDate,
          reservationId,
          position,
          mode: "edit",
        });
      }
    },

    // Set drag Callback
    select: function (info) {
      const resourceId = info.resource?.id;

      console.log("infoooo", info);

      const newEvent = {
        start: dayjs(info.start).format("YYYY-MM-DDTHH:mm:ss"),
        end: dayjs(info.end).format("YYYY-MM-DDTHH:mm:ss"),
        formattedStartTime: dayjs(info.start).format("HH:mm"),
        formattedEndTime: dayjs(info.end).format("HH:mm"),
        resourceId,
        extendedProps: {
          seatNumber: resourceId,
        },
        mode: "add",
      };
      setSelectedEvent(newEvent);
      console.log("newEvent", newEvent);
    },

    // default design setting
    nowIndicator: true,
    headerToolbar: {
      left: "",
      center: "prev, customTitle, next",
      right: "",
    },
    customButtons: {
      customTitle: {
        text: "",
        click: () => setShowMiniCalendar((prev) => !prev),
      },
      nextReservation: {
        text: "다음 예약",
      },
    },

    // Set customTitle button based on currentDate
    datesSet: (info) => {
      const currentDate = info.view.calendar
        ?.getDate()
        ?.toISOString()
        ?.slice(0, 10);

      const currentDateDate = new Date(currentDate);

      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
      };

      const formattedDate = new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(currentDateDate);

      if (currentDate) {
        setClickedDate(currentDate);
      }

      const customTitleButton = calendarRef.current?.querySelector(
        ".fc-customTitle-button.fc-button.fc-button-primary"
      );

      if (customTitleButton) {
        customTitleButton.textContent = formattedDate;
      }

      if (currentDate) {
        setClickedDate(currentDate);
      }
    },
  });

  calendar.render();
  return calendar;
};
