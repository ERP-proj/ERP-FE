"use client";

import { useNextReservation } from "@/hooks/reservation/useNextReservation";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function NextReservation() {
  const { nextReservation } = useNextReservation();

  return (
    <div className="m-4">
      {/* 다음 예약 / 자동 배치 */}
      <div className="h-[2.25rem] flex justify-start items-center p-2 m-2 relative text-left text-base font-semibold">
        다음 예약
      </div>

      {/* 예약 리스트 */}
      <div className="flex flex-col gap-4 bg-[#F2F8ED] rounded-lg">
        <ScrollArea className="h-auto flex-col content-start">
          {nextReservation.length > 0 ? (
            (console.log("nextReservation((((((((((", nextReservation),
            nextReservation.map((reservation: any) => (
              <div
                key={reservation.reservationsId}
                className="bg-white text-black font-medium h-18 min-h-14 flex flex-col justify-around align-middle p-4 rounded-xl m-3 rounded-none"
              >
                <div className="flex justify-between align-middle font-semibold text-sm">
                  <span>{reservation.name}</span>
                  <span className="flex font-normal text-xs text-[#888888]">
                    {reservation.startTime}
                    {"~"}
                    {reservation.endTime}
                  </span>
                </div>
                <div className="flex font-light text-base text-[#3A3A3A]">
                  {"저번 시간 진도"}
                </div>
              </div>
            )))
          ) : (
            <div className="text-center text-gray-500 m-4 bg-white">
              예약 정보가 없습니다.
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default NextReservation;
