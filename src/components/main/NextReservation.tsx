"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNextReservation } from "@/hooks/reservation/useNextReservation";

function NextReservation() {
  const { nextReservation, error } = useNextReservation();

  if (error) {
    return <div className="text-red-500">`Error 발생 {error}`</div>;
  }

  return (
    <>
      {/* 다음 예약 / 자동 배치 */}
      <div className="h-[2.25rem] flex justify-center items-center relative mb-4">
        <div className="flex-grow text-center text-base font-medium">
          다음 예약
        </div>
        <Button className="bg-yellow-200 hover:bg-yellow-300 text-black font-semibold">
          자동배치
        </Button>
      </div>

      {/* 예약 리스트 */}
      <div className="flex flex-col gap-4">
        <ScrollArea className="h-[calc(50vh-60px)]">
          {nextReservation.length > 0 ? (
            nextReservation.map((reservation: any) => (
              <div
                key={reservation.reservationsId}
                className="bg-yellow-100 hover:bg-yellow-200 text-black font-medium  h-32 bg-slate-200 mt-2 first:mt-0 flex justify-between px-4 py-2 flex-col rounded-xl"
              >
                <div className="flex-1 font-semibold"> {reservation.name}</div>
                <div className="flex-1">
                  {reservation.startTime}
                  {"~"}
                  {reservation.endTime}
                </div>
                <div className="flex-1">저번 시간 진도</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              예약 정보가 없습니다.
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
}

export default NextReservation;
