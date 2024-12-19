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
    <div className="m-4">
      {/* 다음 예약 / 자동 배치 */}
      <div className="h-[2.25rem] flex justify-center items-center relative mb-3">
        <div className="flex-grow text-center text-base font-semibold">
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
            (console.log("nextReservation((((((((((", nextReservation),
            nextReservation.map((reservation: any) => (
              <div
                key={reservation.reservationsId}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-medium h-24 mt-3 flex flex-col justify-around align-middle bg-slate-200 px-4 py-2 flex-col rounded-xl"
              >
                <div className="flex justify-between font-semibold">
                  <span>{reservation.name}</span>
                  <span>
                    {reservation.startTime}
                    {"~"}
                    {reservation.endTime}
                  </span>
                </div>
                <div className="flex">저번 시간 진도</div>
              </div>
            )))
          ) : (
            <div className="text-center text-gray-500">
              예약 정보가 없습니다.
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default NextReservation;
