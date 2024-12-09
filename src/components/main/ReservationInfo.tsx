import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import noUser from "../../assets/noUser.png";

export function ReservationInfo() {
  const reservations = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="h-[2.25rem] flex justify-center items-center relative mb-4">
        <div className="flex-grow text-center">다음 예약</div>
        <Button>자동배치</Button>
      </div>

      <div className="flex flex-col gap-4">
        <ScrollArea className="h-[calc(50vh-60px)]">
          {reservations.map((el, i) => (
            <div key={i} className="h-32 bg-slate-200 mt-2 first:mt-0">
              <div className="flex justify-between px-4 py-2">
                <div>홍길동</div>
                <div>010-1234-1234</div>
              </div>
              <div>저번 시간 진도</div>
            </div>
          ))}
        </ScrollArea>

        <ScrollArea className="h-[calc(50vh-60px)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-grow text-center">예약 시간 11:00 ~ 12:00</div>
            <Button>저장</Button>
          </div>
          <div className="flex mb-4">
            <div className="flex-1 mr-4">
              <AspectRatio ratio={7 / 9} className="bg-teal-200">
                <Image
                  src={noUser}
                  alt="noUserImage"
                  className="rounded-md object-cover h-full"
                  fill
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div>이름</div>
              <div>전화번호</div>
              <div>이용권</div>
              <div>이용권 종료기간 + 잔여시간</div>
            </div>
          </div>
          <div className="mb-4">회원 메모</div>
          <div>진도표</div>
        </ScrollArea>
      </div>
    </>
  );
}
