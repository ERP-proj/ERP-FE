"use client";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import MiniCalendar from "./MiniCalendar";

function TimeTable() {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>("");

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
            text: "",
            click: () => {
              setShowMiniCalendar((prev) => !prev);
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
          if (customTitleButton) {
            customTitleButton.textContent = currentDate;
          }
        },
      });

      calendar.render();

      if (clickedDate && calendarRef.current) {
        calendar.gotoDate(clickedDate);
      }
    }

    return () => {
      if (calendar) {
        calendar.destroy();
      }
    };
  }, [clickedDate]);

  return (
    <TimeTableWrapper>
      <div ref={calendarRef} id="calendar" />
      {showMiniCalendar && (
        <MiniCalendarPopup>
          <MiniCalendar
            onDateClick={(date) => {
              setClickedDate(date);
              setShowMiniCalendar(false);
            }}
          />
        </MiniCalendarPopup>
      )}
    </TimeTableWrapper>
  );
}

export default TimeTable;

const MiniCalendarPopup = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const TimeTableWrapper = styled.div`
  position: relative;

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
