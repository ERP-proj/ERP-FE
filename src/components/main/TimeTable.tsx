"use client";

import "../../app/globals.css";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import { calendarSetup } from "../../utils/calendar/calendarSetup";
import { useReservations } from "@/hooks/calendar/useDailyReservation";
import MiniCalendarPopup from "../calendar/MiniCalendarPopup";

function TimeTable({
  setSelectedEvent,
}: {
  setSelectedEvent: (event: any) => void;
}) {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarInstance = useRef<Calendar | null>(null);

  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [clickedDate, setClickedDate] = useState<string>("");

  const { error } = useReservations(clickedDate, calendarInstance);

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
  }, [setSelectedEvent]);

  const handleMiniCalendarDateClick = (date: string) => {
    if (calendarInstance.current) {
      calendarInstance.current.gotoDate(date);
    }
    setClickedDate(date);
    setShowMiniCalendar(false);
  };

  return (
    <div className="relative">
      <div ref={calendarRef} id="calendar" />

      {/* 미니 캘린더 팝업 */}
      {showMiniCalendar && (
        <MiniCalendarPopup onDateClick={handleMiniCalendarDateClick} />
      )}

      {/* 에러 확인 메시지 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TimeTable;
