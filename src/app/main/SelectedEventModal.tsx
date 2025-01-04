"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
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
  onClose: () => void;
}

const SelectedEventModal: React.FC<EventProps> = ({ event, onClose }) => {
  const [startDate, setStartDate] = useState<string | "N/A">("N/A");
  const [endDate, setEndDate] = useState<string | "N/A">("N/A");
  const [userInfo, setUserInfo] = useState<any>(null);

  console.log("eventttttdfdt", event);

  useEffect(() => {
    if (event) {
      const fetchUserInfo = async () => {
        const data = await getReservationCustomerDetails(event.userId);
        setUserInfo(data);
      };

      fetchUserInfo();

      setStartDate(
        event.startDate ? dayjs(event.startDate).format("HH:mm") : "N/A"
      );
      setEndDate(event.endDate ? dayjs(event.endDate).format("HH:mm") : "N/A");
    }
  }, [event]);

  const userData = userInfo?.data;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Modal title */}
        <div className="text-lg font-semibold">예약 수정</div>
        {/* Modal close button */}
        <Button className="size-12" onClick={onClose}>
          <Image src={closeIcon} alt="closeIcon" />
        </Button>
      </div>

      <div className="flex">
        {/* User photo */}
        <div className="flex justify-center items-center size-32 mx-2">
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

        {/* basic info */}
        <div className="flex w-5/12 flex-col mx-2">
          {/* reservation time */}
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

          {/* User name */}
          <div className="text-left m-2 font-semibold">성함</div>
          <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
            {event?.userName ? event?.userName : "더미회원이름"}
          </div>

          {/* User mobile number */}
          <div className="text-left m-2 font-semibold">전화번호</div>
          <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
            {userData?.phone ? userData?.phone : "010-0000-0000"}
          </div>

          {/* Event termination period */}
          <div className="text-left m-2 font-semibold">
            <span>이벤트 종료 기간</span>
            <span>남은 기간</span>
          </div>
          <div className="m-2">
            <span className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
              2024.99.99
            </span>
            <span className=" font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
              999
            </span>
          </div>

          {/* Plan Info */}
          <div className="m-2">
            <h3 className="text-left font-semibold">이용권</h3>
            <p className="px-4 py-2 bg-green-100 border-2 border-green-300 rounded-lg">
              {userData?.planPayment?.licenseType || "이용권이 없습니다."}
            </p>
          </div>

          {/* Late/absent check */}
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

        {/* Additional Info */}
        <div className="flex w-5/12 flex-col mx-2">
          <div className="m-2">
            <h3 className="text-left font-semibold">회원 메모</h3>
            <p className="px-4 py-2 bg-green-100 border-2 border-green-300 rounded-lg">
              {userData?.memo || "메모가 없습니다."}
            </p>
          </div>

          {/* Progress List */}
          <div className="m-2">
            <h3 className="text-left font-semibold">진도표</h3>
            <p className="px-4 py-2 bg-gray-100 rounded-lg">
              {userData?.progressList || "진도표가 없습니다."}
            </p>
          </div>
        </div>
        {/* User memo */}
      </div>
    </div>
  );
};

export default SelectedEventModal;
