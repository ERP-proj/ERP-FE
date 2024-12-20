"use client";
import { useState } from "react";
import SideBar from "./components/SideBar";
import TimeTable from "./main/TimeTable";
import NextReservation from "./main/NextReservation";
import UserReservationInfo from "./main/UserReservationInfo";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="flex gap-4 justify-center align-middle h-screen">
      <div className="w-1/6 h-full bg-gray-200">
        <SideBar />
      </div>
      <div className="flex-[9_0_0]">
        <TimeTable setSelectedEvent={setSelectedEvent} />
      </div>
      <div className="flex-[4_0_0] max-w-96 flex-col">
        <NextReservation />
        <UserReservationInfo event={selectedEvent} />
      </div>
    </div>
  );
}
