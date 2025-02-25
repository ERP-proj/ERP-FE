"use client";
import { useRef, useState } from "react";
import SideBar from "./components/SideBar";
import TimeTable from "./main/TimeTable";
import NextReservation from "./main/NextReservation";
import ReservationModal from "./components/calendar/ReservationModal";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const calendarRef = useRef<any>(null);

  return (
    <div className="flex h-screen">
      <div className="h-full flex-[5_0_0]">
        <SideBar />
      </div>
      <div className="flex-[65_0_0] place-self-center">
        <TimeTable setSelectedEvent={setSelectedEvent} />
      </div>
      <div className="flex flex-col mt-16 flex-[30_0_0] ">
        <NextReservation />
      </div>

      {/* 모달 컴포넌트 */}
      <ReservationModal
        selectedEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        calendarRef={calendarRef}
      />
      <div ref={calendarRef} />
    </div>
  );
}
