"use client";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import styled from "styled-components";
import { initializeCalendar } from "../../../utils/reservation/calendarSetup";
import { useReservations } from "@/hooks/reservation/useReservations";
import MiniCalendarPopup from "../Calendar/MiniCalendarPopup";

function TimeTable() {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarInstance = useRef<Calendar | null>(null);

  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>("");

  const { error } = useReservations(clickedDate, calendarInstance);

  useEffect(() => {
    calendarInstance.current = initializeCalendar(
      calendarRef,
      setClickedDate,
      setShowMiniCalendar
    );

    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
        calendarInstance.current = null;
      }
    };
  }, []);

  return (
    <TimeTableWrapper>
      <div ref={calendarRef} id="calendar" />
      {showMiniCalendar && (
        <MiniCalendarPopup
          onDateClick={(date) => {
            setClickedDate(date);
            setShowMiniCalendar(false);
          }}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </TimeTableWrapper>
  );
}

export default TimeTable;

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
