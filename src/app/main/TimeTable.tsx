"use client";

import "../../app/globals.css";
import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import { calendarSetup } from "../../utils/calendar/calendarSetup";
import MiniCalendarPopup from "../components/calendar/MiniCalendarPopup";
import { useReservations } from "../../hooks/calendar/useDailyReservation";

function TimeTable({
  setSelectedEvent,
  calendarRef,
  calendarInstance,
}: {
  setSelectedEvent: (event: any) => void;
  calendarRef: React.MutableRefObject<HTMLDivElement | null>;
  calendarInstance: React.MutableRefObject<Calendar | null>;
}) {
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
      console.log("✅ calendarInstance 설정 완료:", calendarInstance.current);
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
    <div className="relative bg-white py-2 px-5 rounded-3xl ">
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
