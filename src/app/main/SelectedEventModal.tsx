"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import noUser from "../../assets/noUser.png";
import { Button } from "../components/ui/button";
import closeIcon from "../../../public/reservationModal/closeIcon.png";
import { postAddReservations } from "@/api/reservation/postAddReservations";
import { putUpdateReservations } from "@/api/reservation/putUpdateReservations";
import { deleteReservations } from "@/api/reservation/deleteReservations";

interface EventProps {
  event: {
    startTime: string;
    endTime: string;
    resourceId: string;
    reservationId: number;
    mode: "add" | "edit";
  } | null;
  onClose: () => void;
}

const SelectedEventModal: React.FC<EventProps> = ({ event, onClose }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    console.log("~~~~~~~~~~~event", event);

    // Case 1: add Mode
    if (event?.mode == "add") {
      setUserInfo(event);
    }

    // Case 2: Edit Mode
    if (event?.reservationId) {
      const fetchUserInfo = async () => {
        const data = await getReservationCustomerDetails(event.reservationId);
        setUserInfo(data?.data || null);
      };

      fetchUserInfo();
    }
  }, [event]);

  console.log("response(userInfo)", userInfo);
  console.log("response(event)", event);

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    let response;
    try {
      if (userInfo?.mode == "add") {
        console.log("------Submit ADD------");
        const response = await postAddReservations(userInfo);
      } else {
        console.log("------Submit EDIT------");
        const response = await putUpdateReservations(userInfo);
      }
    } finally {
      onClose();
    }
    return response;
  };

  const handleDelete = async () => {
    if (!event?.reservationId) {
      console.error("Reservation ID is missing. Can not Delete");
      return;
    }
    console.log("-----Delete------");
    const response = await deleteReservations(event?.reservationId);
    onClose();
    return response;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Modal title */}
        <div className="text-lg font-semibold">
          {event?.mode === "add" ? "예약 추가" : "예약 수정"}
        </div>
        {/* Modal close button */}
        <Button className="size-12" onClick={onClose}>
          <Image src={closeIcon} alt="closeIcon" />
        </Button>
      </div>

      <div className="flex">
        {/* User photo */}
        <div className="justify-center m-2 size-32">
          {userInfo?.photoUrl !== undefined ? (
            <Image
              src={userInfo.photoUrl || noUser}
              alt="User Photo"
              className="object-cover rounded-lg"
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
            {/* Start Time */}
            <input
              className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888]"
              type="time"
              value={
                userInfo?.formattedStartTime !== undefined
                  ? userInfo?.formattedStartTime
                  : ""
              }
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            ></input>
            {/* ~ */}
            <span className="font-light p-2 ">~</span>
            {/* End Time */}
            <input
              className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888]"
              type="time"
              value={
                userInfo?.formattedEndTime !== undefined
                  ? userInfo?.formattedEndTime
                  : ""
              }
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            ></input>
          </div>

          {/* User name */}
          <div className="text-left m-2 font-semibold">성함</div>
          <input
            className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229] min-h-7"
            type="search"
            value={userInfo?.name !== undefined ? userInfo?.name : ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          ></input>

          {/* User phone number */}
          <div className="text-left m-2 font-semibold">전화번호</div>
          <input
            className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229] min-h-7"
            value={userInfo?.phone !== undefined ? userInfo?.phone : ""}
            type="tel"
            onChange={(e) => handleInputChange("phone", e.target.value)}
          ></input>

          {/* Event termination period */}
          <div className="text-left m-2 font-semibold">
            <span>이벤트 종료 기간</span>
            <span>남은 기간</span>
          </div>
          <div className="flex m-2">
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 mr-2 rounded-lg text-[#888888] min-h-7">
              {""}
            </span>
            <span className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7">
              {userInfo?.remainingTime !== undefined
                ? userInfo.remainingTime
                : ""}
            </span>
          </div>

          {/* Plan Info */}
          <div className="text-left m-2 font-semibold">이용권</div>
          <div className="font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229] min-h-7">
            {userInfo?.planName !== undefined ? userInfo?.planName : ""}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex w-6/12 flex-col mx-2">
          {/* User memo */}
          <div className="text-left m-2 font-semibold">회원 메모</div>
          <input
            className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229]"
            value={userInfo?.memo !== undefined ? userInfo?.memo : ""}
            type="text"
            onChange={(e) => handleInputChange("memo", e.target.value)}
          ></input>

          {/* Progress List */}
          <div className="text-left m-2 font-semibold">진도표</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229]">
            {userInfo?.progress !== undefined ? userInfo?.progress : ""}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Edit & Save button */}
        <Button
          className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2"
          onClick={handleSubmit}
        >
          {event?.mode === "add" ? "저장" : "수정 완료"}
        </Button>
        {event?.mode === "edit" && (
          <Button
            className="flex flex-1 font-light bg-[#FFFFFF] border-2 border-[#DB5461] rounded-lg text-[#DB5461] p-2 mt-4"
            onClick={handleDelete}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectedEventModal;
