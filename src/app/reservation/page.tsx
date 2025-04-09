"use client";
import { useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import SideBar from "../components/SideBar";
import Reservation from "../components/reservation/Reservation";
import ReservationModal from "../components/reservation/reservationModal/ReservationModal";
import { SelectedEvent } from "@/types/eventType";

export default function Page() {
  const [selectedEvent, setSelectedEvent] = useState<null | SelectedEvent>(
    null
  );
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstance = useRef<Calendar>(null);

  console.log("selectedEvent", selectedEvent);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SideBar */}
      <div className="h-full flex-[5_0_0]">
        <SideBar />
      </div>

      {/* Reservation */}
      <div className="h-full flex-[95_0_0] self-center mr-[130px] py-10 overflow-hidden">
        <Reservation
          setSelectedEvent={setSelectedEvent}
          calendarRef={calendarRef}
          calendarInstance={calendarInstance}
        />
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        selectedEvent={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        calendarInstance={calendarInstance}
      />
    </div>
  );
}
