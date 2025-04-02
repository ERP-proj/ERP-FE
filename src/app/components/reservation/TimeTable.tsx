"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import { calendarSetup } from "../../../utils/calendar/calendarSetup";
import MiniCalendarPopup from "./MiniCalendarPopup";
import { loadReservation } from "@/api/reservation/loadReservation";
import dayjs from "dayjs";
import { SelectedEvent } from "@/types/eventType";

function TimeTable({
  setSelectedEvent,
  calendarRef,
  calendarInstance,
}: {
  setSelectedEvent: (event: SelectedEvent | null) => void;
  calendarRef: React.MutableRefObject<HTMLDivElement | null>;
  calendarInstance: React.MutableRefObject<Calendar | null>;
}) {
  const now = dayjs();
  const nowDate = now.format("YYYY-MM-DD");
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>("");

  useEffect(() => {
    if (calendarRef.current) {
      calendarInstance.current = calendarSetup(
        calendarRef,
        setClickedDate,
        setShowMiniCalendar,
        setSelectedEvent,
        now
      );
    }

    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
        calendarInstance.current = null;
      }
    };
  }, [calendarRef, calendarInstance, setSelectedEvent]);

  useEffect(() => {
    if (calendarInstance.current) {
      loadReservation(nowDate, calendarInstance);
    }
  }, [calendarInstance]);

  const handleMiniCalendarDateClick = (date: string) => {
    if (calendarInstance.current) {
      calendarInstance.current.gotoDate(date);
    }
    setClickedDate(date);
    setShowMiniCalendar(false);
  };

  return (
    <div className="h-full bg-white py-2 px-5 rounded-3xl ">
      <div ref={calendarRef} id="calendar" className="h-full" />

      {showMiniCalendar && (
        <MiniCalendarPopup onDateClick={handleMiniCalendarDateClick} />
      )}
    </div>
  );
}

export default TimeTable;
