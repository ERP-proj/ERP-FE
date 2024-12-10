"use client";
import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import interactionPlugin from "@fullcalendar/interaction";

interface MiniCalendarProps {
  onDateClick: (date: string) => void;
}

function MiniCalendar({ onDateClick }: MiniCalendarProps) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let calendar: Calendar | null = null;

    if (calendarRef.current) {
      calendar = new Calendar(calendarRef.current, {
        timeZone: "UTC",
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        selectable: true,
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
    width: 300px;
    height: 300px;
    max-width: 100%;
    background-color: #fcf596;
    font-size: 1rem;
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
  }

  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fc-toolbar-title {
    font-size: 1rem;
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

  .dateCell {
    background-color: #ffffff !important;
  }
`;
