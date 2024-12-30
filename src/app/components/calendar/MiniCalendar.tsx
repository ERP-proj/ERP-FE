"use client";
import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

interface MiniCalendarProps {
  onDateClick: (date: string) => void;
}

function MiniCalendar({ onDateClick }: MiniCalendarProps) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let calendar: Calendar | null = null;

    if (calendarRef.current) {
      calendar = new Calendar(calendarRef.current, {
        timeZone: "local",
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        selectable: true,
        aspectRatio: 1,
        fixedWeekCount: false,
        locale: koLocale,

        dateClick: function (info) {
          const clickedDate = info.dateStr;
          onDateClick(clickedDate);
        },
        headerToolbar: {
          left: "",
          center: "prev, title, next",
          right: "",
        },
        titleFormat: {
          year: "numeric",
          month: "long",
        },
        dayCellClassNames: "dateCell",
      });

      calendar.render();
    }
  }, [onDateClick]);

  return (
    <MiniCalendarWrapper>
      <div ref={calendarRef} id="calendar" />
    </MiniCalendarWrapper>
  );
}

export default MiniCalendar;

const MiniCalendarWrapper = styled.div`
  #calendar {
    max-width: 100%;
    background-color: #f6f6f6;
    font-size: 10px;
    padding: 0px;
    width: 300px;
    height: 300px;
  }

  .fc-theme-standard {
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 1000;
  }

  .fc .fc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fc-toolbar-title {
    font-size: 12px;
  }

  .fc .fc-button-primary {
    background-color: #f6f6f6;
    border-color: None;
    color: #000000;
  }

  .fc-button:empty {
    display: none;
  }

  .fc .fc-scrollgrid-sync-inner {
    background-color: #ffffff;
  }

  .dateCell {
    background-color: #ffffff !important;
  }

  .fc-theme-standard td,
  .fc-theme-standard th {
    border: None;
  }

  .fc .fc-view-harness-active {
    border: None;
  }
`;
