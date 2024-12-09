"use client";
import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";

function TimeTable() {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let calendar: Calendar | null = null;

    if (calendarRef.current) {
      calendar = new Calendar(calendarRef.current, {
        timeZone: "UTC",
        plugins: [resourceTimeGridPlugin, dayGridPlugin],
        initialView: "resourceTimeGridDay",
        headerToolbar: {
          left: "today",
          center: "prev, customTitle, next",
          right: "resourceTimeGridDay, timeGridWeek, dayGridMonth",
        },
        titleFormat: {
          month: "2-digit",
          day: "2-digit",
        },
        customButtons: {
          customTitle: {
            text: "temp",
            click: () => {
              console.log("customTitle is clicked");
            },
          },
        },
        resources: [
          { id: "column1", title: "Student1" },
          { id: "column2", title: "Student2" },
          { id: "column3", title: "Student3" },
          { id: "column4", title: "Student4" },
        ],
        datesSet: function (info) {
          const currentDate = info.view.calendar
            ?.getDate()
            ?.toISOString()
            ?.slice(0, 10);
          const customTitleButton = calendarRef.current?.querySelector(
            ".fc-customTitle-button.fc-button.fc-button-primary"
          );
          console.log("customTitleButton", customTitleButton);
          console.log("currentDate", currentDate);
          if (customTitleButton) {
            customTitleButton.textContent = currentDate;
          }
        },
      });

      calendar.render();
    }

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, []);

  return (
    <TimeTableWrapper>
      <div ref={calendarRef} id="calendar" />
    </TimeTableWrapper>
  );
}

export default TimeTable;

const TimeTableWrapper = styled.div`
  .fc .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fc .fc-button-primary {
    background-color: #fcf596;
    border-color: #fcf596;
    color: #000000;
  }

  .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #fbd288;
    border-color: #fbd288;
    color: #000000;
  }

  .fc-button:empty {
    display: none;
  }
`;
