"use client";
import { useState } from "react";
import SideBar from "./components/SideBar";
import TimeTable from "./main/TimeTable";
import NextReservation from "./main/NextReservation";
import ReservationModal from "./components/calendar/ReservationModal";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="flex justify-center align-middle h-screen items-center">
      <div className="flex-[4_0_0] h-full">
        <SideBar />
      </div>
      <div className="flex-[50_0_0]">
        <TimeTable setSelectedEvent={setSelectedEvent} />
      </div>
      <div className="flex-[50_0_0] max-w-screen-md min-w-72 text-center flex-col">
        <NextReservation />
      </div>

      {/* 모달 컴포넌트 */}
      <ReservationModal
        selectedEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
