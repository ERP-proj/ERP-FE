import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
    contentHeight: 700,

    // Set calendar resources
    resources: [
      { id: "SeatNumber1", title: "1" },
      { id: "SeatNumber2", title: "2" },
      { id: "SeatNumber3", title: "3" },
      { id: "SeatNumber4", title: "4" },
      { id: "SeatNumber5", title: "5" },
      { id: "SeatNumber6", title: "6" },
      { id: "SeatNumber7", title: "7" },
      { id: "SeatNumber8", title: "8" },
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
        const rect = target.getBoundingClientRect();
        const position = {
          top: rect.top + window.scrollY + rect.height / 4,
          left: rect.left + window.scrollX + rect.width * 1.2,
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
        });
      }
    },

    // Set drag Callback
    select: function (info) {
      const start = info.start;
      const end = info.end;
      const resourceId = info.resource?.id;

      console.log("infoooo", info);
      const title = prompt("새로운 예약");
      if (title) {
        calendar.addEvent({
          title,
          start,
          end,
          resourceId,
          extendedProps: {
            seatNumber: resourceId,
          },
        });

        alert(
          `새로운 예약이 추가되었습니다:\nStart: ${info.startStr}\nEnd: ${info.endStr}\nResource: ${resourceId}`
        );
      }
    },

    // default design setting
    nowIndicator: true,
    headerToolbar: {
      left: "",
      center: "prev, customTitle, next",
      right: "nextReservation",
    },
    customButtons: {
      // customButton : customTitle
      customTitle: {
        text: "",
        click: () => setShowMiniCalendar((prev) => !prev),
      },

      // customButton : nextReservation
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

      // 사용자 local 시간에서 KR 시간으로 변경 및 날짜 00월 00일 포맷팅팅
      const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
        currentDateDate
      );

      if (currentDate) {
        setClickedDate(currentDate);
      }

      const customTitleButton = calendarRef.current?.querySelector(
        ".fc-customTitle-button.fc-button.fc-button-primary"
      );

      // customTitle에 들어갈 제목 포맷팅
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
