"use client";

import "../../app/globals.css";
import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import { calendarSetup } from "../../utils/calendar/calendarSetup";
import MiniCalendarPopup from "../components/calendar/MiniCalendarPopup";
import { loadReservation } from "@/api/reservation/loadReservation";
import dayjs from "dayjs";

function TimeTable({
  setSelectedEvent,
  calendarRef,
  calendarInstance,
}: {
  setSelectedEvent: (event: any) => void;
  calendarRef: React.MutableRefObject<HTMLDivElement | null>;
  calendarInstance: React.MutableRefObject<Calendar | null>;
}) {
  const now = dayjs().format("YYYY-MM-DD");
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>("");

  useEffect(() => {
    if (calendarRef.current) {
      calendarInstance.current = calendarSetup(
        calendarRef,
        setClickedDate,
        setShowMiniCalendar,
        setSelectedEvent
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
      // (now, calendarInstance);
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
    <div className="relative bg-white py-2 px-5 rounded-3xl ">
      <div ref={calendarRef} id="calendar" />

      {/* 미니 캘린더 팝업 */}
      {showMiniCalendar && (
        <MiniCalendarPopup onDateClick={handleMiniCalendarDateClick} />
      )}
    </div>
  );
}

export default TimeTable;
