"use client";
import { useState } from "react";
import SideBar from "./components/SideBar";
import TimeTable from "./main/TimeTable";
import NextReservation from "./main/NextReservation";
import ReservationModal from "./components/calendar/ReservationModal";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="flex">
      <div className=" flex-[5_0_0] h-full place-items-center">
        <SideBar />
      </div>
      <div className="flex-[65_0_0]">
        <TimeTable setSelectedEvent={setSelectedEvent} />
      </div>
      <div className="flex flex-col flex-[30_0_0]">
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
