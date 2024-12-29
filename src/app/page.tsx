"use client";
import { useState } from "react";
import SideBar from "./components/SideBar";
import TimeTable from "./main/TimeTable";
import NextReservation from "./main/NextReservation";
import UserReservationInfo from "./main/UserReservationInfo";

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
      <div className="flex-[4_0_0] max-w-96 min-w-72 text-center flex-col">
        <NextReservation />
        {selectedEvent ? (
          <UserReservationInfo event={selectedEvent} />
        ) : (
          "선택된 이벤트가 없습니다."
        )}
      </div>
    </div>
  );
}
