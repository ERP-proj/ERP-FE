"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import noUser from "../../assets/noUser.png";
import { Button } from "../components/ui/button";
import closeIcon from "../../../public/reservationModal/closeIcon.png";

interface EventProps {
  event: {
    reservationId: number;
  } | null;
  onClose: () => void;
}

const SelectedEventModal: React.FC<EventProps> = ({ event, onClose }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (event) {
      const fetchUserInfo = async () => {
        const data = await getReservationCustomerDetails(event.reservationId);
        setUserInfo(data);
      };

      fetchUserInfo();
    }
  }, [event]);

  const userData = userInfo?.data;
  console.log("****************************");
  console.log(userData);

  const formattedStartTime = userData?.startTime
    ? dayjs(userData?.startTime).format("HH:mm")
    : "N/A";

  const formattedEndTime = userData?.endDate
    ? dayjs(userData?.endTime).format("HH:mm")
    : "N/A";

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
        <div className="flex w-2/12 justify-center m-2">
          {userData?.photoUrl !== undefined ? (
            <Image
              src={userData.photoUrl || noUser}
              alt="User Photo"
              className="w-fit h-fit object-cover rounded-xl"
            />
          ) : (
            <Image src={noUser} alt="noUser" />
          )}
        </div>

        {/* basic info */}
        <div className="flex w-6/12 flex-col mx-2">
          {/* reservation time */}
          <div className="flex justify-between text-left m-2 font-semibold">
            예약 시간
          </div>
          <div className="flex justify-between">
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-xl text-[#888888]">
              {formattedStartTime !== undefined ? formattedStartTime : "N/A"}
            </span>
            <span className="font-light p-2 ">~</span>
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-xl text-[#888888]">
              {formattedEndTime !== undefined ? formattedEndTime : "N/A"}
            </span>
          </div>

          {/* User name */}
          <div className="text-left m-2 font-semibold">성함</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-xl border-[#D1D1D1] border-2 text-[#3C6229]">
            {userData?.name !== undefined ? userData?.name : "더미회원이름"}
          </div>

          {/* User mobile number */}
          <div className="text-left m-2 font-semibold">전화번호</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-xl border-[#D1D1D1] border-2 text-[#3C6229]">
            {userData?.phone !== undefined ? userData?.phone : "N/A"}
          </div>

          {/* Event termination period */}
          <div className="text-left m-2 font-semibold">
            <span>이벤트 종료 기간</span>
            <span>남은 기간</span>
          </div>
          <div className="flex m-2">
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 mr-2 rounded-xl text-[#888888]">
              {"N/A"}
            </span>
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-xl text-[#888888]">
              {userData?.remainingTime !== undefined
                ? userData.remainingTime
                : "N/A"}
            </span>
          </div>

          {/* Plan Info */}
          <div className="text-left m-2 font-semibold">이용권</div>
          <div className="font-light bg-[#FFFFFF] p-2 rounded-xl border-[#D1D1D1] border-2 text-[#3C6229]">
            {userData?.planName !== undefined ? userData?.planName : "N/A"}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex w-6/12 flex-col mx-2">
          {/* User memo */}
          <div className="text-left m-2 font-semibold">회원 메모</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-xl border-[#D1D1D1] border-2 text-[#3C6229]">
            {userData?.memo !== undefined ? userData?.memo : "N/A"}
          </div>

          {/* Progress List */}
          <div className="text-left m-2 font-semibold">진도표</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-xl border-[#D1D1D1] border-2 text-[#3C6229]">
            {userData?.progress !== undefined ? userData?.progress : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedEventModal;
