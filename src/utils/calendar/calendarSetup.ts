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
      { id: "1", title: "더미1" },
      { id: "2", title: "더미2" },
      { id: "3", title: "더미3" },
      { id: "4", title: "더미4" },
    ],

    // Set event items
    events: [],
    eventTextColor: "#000000",
    // eventMouseEnter: function (info) {
    //   info.el.style.backgroundColor = "rgb(250, 204, 21)";
    // },
    // eventMouseLeave: function (info) {
    //   info.el.style.backgroundColor = "rgb(254, 240, 138)";
    // },

    // Set event click Callback
    eventClick: function (info) {
      const eventObj = info.event;
      const userName = eventObj?.title;
      const startDate = eventObj?.start;
      const endDate = eventObj?.end;
      // be 수정 후 수정 필요
      const userId = eventObj?.id;

      console.log("---------Set event click Callback", info);
      console.log("userName/startDate/endDate", userName, startDate, endDate);

      setSelectedEvent({
        userName,
        userId,
        startDate,
        endDate,
      });
    },

    // Set drag Callback
    select: function (info) {
      const start = info.start;
      const end = info.end;
      const resourceId = info.resource?.id;

      const overlappingEvents = calendar.getEvents().filter((event) => {
        if (event.start && event.end) {
          return (
            (event.start >= start && event.start < end) ||
            (event.end > start && event.end <= end) ||
            (event.start <= start && event.end >= end)
          );
        }
        return false;
      });

      if (overlappingEvents.length > 0) {
        alert(
          `선택한 시간이 겹칩니다: \nStart: ${info.startStr}\nEnd: ${info.endStr}\n\n` +
            `겹치는 이벤트:\n` +
            overlappingEvents
              .map(
                (e) =>
                  `- ${
                    e.title
                  } (${e.start?.toLocaleTimeString()} - ${e.end?.toLocaleTimeString()})`
              )
              .join("\n")
        );
      } else {
        const title = prompt("새로운 예약");
        if (title) {
          calendar.addEvent({
            title,
            start,
            end,
            resourceId,
          });

          alert(
            `새로운 예약이 추가되었습니다:\nStart: ${info.startStr}\nEnd: ${info.endStr}\nResource: ${resourceId}`
          );
        }
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
