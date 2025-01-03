"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@radix-ui/react-dialog";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import noUser from "../../assets/noUser.png";
import inactiveCheck from "../../../public/reservationModal/inactiveCheck.png";
import { Button } from "../components/ui/button";
import closeIcon from "../../../public/reservationModal/closeIcon.png";
interface EventProps {
  event: {
    userName: string;
    getReservationCustomerDetails: any;
    userId: number;
    startDate: string | null;
    endDate: string | null;
  } | null;
}

const UserReservationInfo: React.FC<EventProps> = ({ event }) => {
  const [startDate, setStartDate] = useState<string | "N/A">("N/A");
  const [endDate, setEndDate] = useState<string | "N/A">("N/A");
  const [userInfo, setUserInfo] = useState<any>(null);

  console.log("eventttttt", event);

  useEffect(() => {
    if (event) {
      const fetchUserInfo = async () => {
        const data = await getReservationCustomerDetails(event.userId);
        setUserInfo(data);
      };

      fetchUserInfo();

      const updatedStartDate = event.startDate
        ? dayjs(event.startDate).format("HH:mm")
        : "N/A";
      const updatedEndDate = event.endDate
        ? dayjs(event.endDate).format("HH:mm")
        : "N/A";

      setStartDate(updatedStartDate);
      setEndDate(updatedEndDate);
    }
  }, [event]);

  const userData = userInfo?.data;

  return (
    <Dialog>
      {/* 유저 예약 정보*/}
      <div className="flex flex-col text-sm mx-4 p-5 rounded-xl bg-[#FFFFFF]">
        <div className="flex justify-between align-center">
          <DialogTitle className="flex text-left m-2 font-semibold text-lg">
            예약 수정
          </DialogTitle>
          <DialogClose asChild>
            <Button className="size-12">
              <Image src={closeIcon} alt="closeIcon" />
            </Button>
          </DialogClose>
        </div>

        <DialogContent>
          <ScrollArea className="flex flex-row justify-center w-full h-[calc(50vh-60px)]">
            {/* 모달 제목: 예약 수정 */}

            {/* 회원 사진 */}
            <div className="flex justify-center items-center size-32 m-1">
              {userData?.photoUrl ? (
                <Image
                  src={userInfo.data.photoUrl || noUser}
                  alt="User Photo"
                  className="w-32 h-32 object-cover rounded-xl"
                />
              ) : (
                <Image src={noUser} alt="noUser" />
              )}
            </div>

            {/* 기본 정보 */}
            <div className="flex flex-1 flex-col">
              {/* 예약 시간 */}
              <div className="flex text-left m-2 font-semibold">예약 시간</div>
              <div>
                <span className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                  {startDate !== "N/A" ? startDate : "N/A"}
                </span>
                <span className="font-light p-2 ">~</span>
                <span className="font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                  {endDate !== "N/A" ? endDate : "N/A"}
                </span>
              </div>

              {/* 회원명 */}
              <div className="text-left m-2 font-semibold">성함</div>
              <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
                {event?.userName ? event?.userName : "더미회원이름"}
              </div>

              {/* 전화 번호 */}
              <div className="text-left m-2 font-semibold">전화번호</div>
              <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
                {userData?.phone ? userData?.phone : "010-0000-0000"}
              </div>

              {/* 이벤트 종료 기간 */}
              <div className="text-left m-2 font-semibold">
                <span>이벤트 종료 기간</span>
                <span>남은 기간</span>
              </div>
              <div>
                <span className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                  2024.99.99
                </span>
                <span className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                  999
                </span>
              </div>

              {/* 이용권 */}
              <div className="text-left m-2 font-semibold"> 이용권 </div>
              <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
                {userData?.planPayment?.licenseType
                  ? userData?.planPayment?.licenseType
                  : "이용권이 존재하지 않습니다."}
              </div>

              {/* 지각/결석 */}
              <div className="text-left m-2 font-semibold">지각/결석</div>
              <div className="flex flex-row gap-3 align-center justify-center">
                <span className="flex gap-1">
                  <Image
                    src={inactiveCheck}
                    alt="inactiveCheck"
                    className="size-5"
                  />
                  <button>지각</button>
                </span>
                <span className="flex gap-1">
                  <Image
                    src={inactiveCheck}
                    alt="inactiveCheck"
                    className="size-5"
                  />
                  <button>결석</button>
                </span>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="flex flex-1 flex-col">
              {/* 회원 메모 */}
              <div className="text-left m-2 font-semibold">회원 메모</div>
              <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
                {userData?.memo ? userData?.memo : "메모가 존재하지 않습니다."}
              </div>

              {/* 진도표 */}
              <ScrollArea className="h-[calc(50vh-60px)]">
                <div className="text-left m-2 font-semibold">진도표</div>
                <div className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                  {userData?.progressList
                    ? userData?.progressList
                    : "진도표가 존재하지 않습니다."}
                </div>
              </ScrollArea>
            </div>
          </ScrollArea>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UserReservationInfo;
