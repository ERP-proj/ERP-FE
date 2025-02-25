"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import noUser from "../../assets/noUser.png";
import { Button } from "../components/ui/button";
import closeIcon from "../../../public/reservationModal/closeIcon.png";
import unchecked from "../../../public/reservationModal/unchecked.png";
import checked from "../../../public/reservationModal/checked.png";
import { postAddReservations } from "@/api/reservation/postAddReservations";
import { putUpdateReservations } from "@/api/reservation/putUpdateReservations";
import { deleteReservations } from "@/api/reservation/deleteReservations";
import { searchCustomerName } from "@/api/reservation/searchCustomerName";
import { debounce } from "lodash";

interface EventProps {
  event: {
    startTime: string;
    endTime: string;
    seatNumber: number;
    reservationId: number;
    attendanceStatus: string;
    mode: "add" | "edit";
  } | null;
  onClose: () => void;
  refreshReservations: () => void;
}

const SelectedEventModal: React.FC<EventProps> = ({
  event,
  onClose,
  refreshReservations,
}) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    console.log("~~~~~~~~~~~event", event);

    // Case 1: add Mode
    if (event?.mode == "add") {
      setUserInfo(event);
    }
    // Case 2: Edit Mode
    else if (event?.mode == "edit") {
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
        response = await postAddReservations({
          ...userInfo,
          customerId: userInfo.customerId,
        });
      } else if (event?.mode == "edit") {
        console.log("------Submit EDIT------");
        response = await putUpdateReservations({
          reservationId: event?.reservationId,
          startTime: userInfo?.startTime,
          endTime: userInfo?.endTime,
          memo: userInfo?.memo,
          seatNumber: event?.seatNumber,
          attendanceStatus: userInfo?.attendanceStatus,
        });
      }
    } finally {
      onClose();
      refreshReservations();

      if (refreshReservations) {
        console.log("🚀 refreshReservations 실행됨");
        refreshReservations();
      } else {
        console.log("❌ refreshReservations 없음");
      }
    }
    return response;
  };

  const handleDelete = async () => {
    if (!event?.reservationId) {
      console.error("Reservation ID is missing. Can not Delete");
      return;
    }
    console.log("🚀 -----Delete 요청 보냄------");
    const response = await deleteReservations(event?.reservationId);

    console.log("✅ 삭제 완료, onClose 실행");
    onClose();

    console.log("🚀 refreshReservations 실행");
    await refreshReservations(); // ✅ 삭제 후 강제 새로고침
    return response;
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = debounce(async (keyword: string) => {
    if (keyword.trim() === "") {
      setCustomerList([]);
      setIsSearching(false);
      return;
    }

    try {
      const response = await searchCustomerName(keyword.trim());
      setCustomerList(response.data || []);
    } catch (error) {
      console.error("Failed to search custoemr name", error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearching(true);
    performSearch(keyword);
  };

  const handleSelectCustomer = (customer: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      name: customer.name,
      customerId: customer.customerId,
    }));
    setSearchKeyword(customer.name);
    setCustomerList([]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-2">
        {/* Modal title */}
        <div className="text-xl font-semibold">
          {event?.mode === "add" ? "예약 추가" : "예약 수정"}
        </div>
        {/* Modal close button */}
        <Button className="size-12" onClick={onClose}>
          <Image src={closeIcon} alt="closeIcon" />
        </Button>
      </div>

      <div className="flex gap-3">
        {/* User photo */}
        <div className="justify-center m-1 size-32">
          {userInfo?.photoUrl !== undefined ? (
            <Image
              src={userInfo.photoUrl || noUser}
              alt="User Photo"
              width={100}
              height={100}
              layout="intrinsic"
              className="object-cover rounded-lg"
            />
          ) : (
            <Image src={noUser} alt="noUser" />
          )}
        </div>

        {/* basic info */}
        <div className="flex flex-col mx-2 max-w-[250px] max-h-[600px] overflow-y-auto space-y-2">
          {/* reservation time */}
          <div className="flex justify-between text-left m-1 font-semibold">
            예약 시간
          </div>
          <div className="flex flex-row gap-1">
            {/* Start Time */}
            <input
              className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0"
              type="text"
              maxLength={5}
              value={userInfo?.formattedStartTime || ""}
              placeholder="00:00"
              readOnly={event?.mode === "add"}
              onChange={(e) => {
                const input = e.target.value.replace(/[^0-9]/g, "");
                if (input.length <= 4) {
                  const formattedTime =
                    input.length > 2
                      ? `${input.slice(0, 2)}:${input.slice(2)}`
                      : input;

                  const updatedStartTime = `${userInfo.startTime.slice(
                    0,
                    11
                  )}${formattedTime}:00`;

                  setUserInfo((prev: any) => ({
                    ...prev,
                    formattedStartTime: formattedTime,
                    startTime: updatedStartTime,
                  }));
                }
              }}
            />
            {/* ~ */}
            <div className="font-light p-2 min-h-7">~</div>
            {/* End Time */}
            <input
              className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0"
              type="text"
              maxLength={5}
              value={userInfo?.formattedEndTime || ""}
              placeholder="00:00"
              onChange={(e) => {
                const input = e.target.value.replace(/[^0-9]/g, "");
                if (input.length <= 4) {
                  const formattedTime =
                    input.length > 2
                      ? `${input.slice(0, 2)}:${input.slice(2)}`
                      : input;

                  const updatedEndTime = `${userInfo.endTime.slice(
                    0,
                    11
                  )}${formattedTime}:00`;

                  setUserInfo((prev: any) => ({
                    ...prev,
                    formattedEndTime: formattedTime,
                    endTime: updatedEndTime,
                  }));
                }
              }}
            />
          </div>

          {/* User name */}
          <div className="text-left m-1 font-semibold">성함</div>
          <input
            className="flex-1 font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7"
            type="search"
            value={event?.mode === "add" ? searchKeyword : userInfo?.name}
            onChange={(e) => handleSearch(e.target.value)}
            readOnly={event?.mode === "edit"}
          ></input>

          {/* 고객 검색 결과 */}
          {isSearching && <div className="p-2 text-gray-500">검색 중...</div>}
          {searchKeyword && customerList.length > 0 && (
            <div className="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
              {customerList.map((customer) => (
                <div
                  key={customer.customerId}
                  className="p-2 hover:bg-[#F2F8ED] cursor-pointer"
                  onClick={() => handleSelectCustomer(customer)}
                >
                  {customer.name}
                </div>
              ))}
            </div>
          )}

          {/* User phone number */}
          <div className="text-left m-1 font-semibold">전화번호</div>
          <input
            className="flex-1 font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7"
            value={userInfo?.phone !== undefined ? userInfo?.phone : ""}
            type="tel"
            onChange={(e) => handleInputChange("phone", e.target.value)}
          ></input>

          {/* Event termination period */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex-1 text-left m-1 font-semibold justify-around">
                이벤트 종료 기간
              </div>
              <div className="flex-1 text-left m-1 font-semibold justify-around">
                남은 기간
              </div>
            </div>

            <div className="flex flex-row gap-1">
              <div className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0">
                {userInfo?.endDate !== undefined
                  ? userInfo.endDate.split("T")[0]
                  : ""}
              </div>
              <div className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0">
                {userInfo?.remainingTime !== undefined
                  ? userInfo.remainingTime
                  : ""}
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="text-left m-1 font-semibold">이용권</div>
          <div className="font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7">
            {userInfo?.planName !== undefined ? userInfo?.planName : ""}
          </div>

          {/* Attendency Info */}
          {event?.mode == "edit" && (
            <div>
              <div className="text-left m-1 font-semibold">지각/결석</div>
              <div className="flex flex-row">
                <Image
                  src={
                    userInfo?.attendanceStatus === "LATE" ? checked : unchecked
                  }
                  alt="late"
                  className="flex self-center size-5"
                  onClick={() =>
                    setUserInfo((prev: any) => ({
                      ...prev,
                      attendanceStatus:
                        prev?.attendanceStatus === "LATE" ? "NORMAL" : "LATE",
                    }))
                  }
                />
                <div className="flex-1 font-light p-2 min-h-7">지각</div>
                <Image
                  src={
                    userInfo?.attendanceStatus === "ABSENT"
                      ? checked
                      : unchecked
                  }
                  alt="absent"
                  className="flex self-center size-5"
                  onClick={() =>
                    setUserInfo((prev: any) => ({
                      ...prev,
                      attendanceStatus:
                        prev?.attendanceStatus === "ABSENT"
                          ? "NORMAL"
                          : "ABSENT",
                    }))
                  }
                />
                <div className="flex-1 font-light p-2 min-h-7">결석</div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="flex flex-col mx-2">
          {/* User memo */}
          <div className="text-left m-1 font-semibold">회원 메모</div>
          <input
            className="flex-1 font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229]"
            value={userInfo?.memo !== undefined ? userInfo?.memo : ""}
            type="text"
            onChange={(e) => handleInputChange("memo", e.target.value)}
          ></input>

          {/* Progress List */}
          <div className="text-left m-1 font-semibold">진도표</div>
          <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229]">
            {userInfo?.progressList !== undefined ? userInfo?.progressList : ""}
          </div>
        </div>
      </div>

      {/* Edit & Save button */}
      {event?.mode === "add" && (
        <Button
          className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2 hover:bg-[#3C6229] hover:text-[#FFFFFF]"
          onClick={handleSubmit}
        >
          저장
        </Button>
      )}
      {event?.mode === "edit" && (
        <div className="flex flex-1 gap-4">
          <Button
            className="flex flex-1 font-light bg-[#FFFFFF] border-2 border-[#DB5461] rounded-lg text-[#DB5461] p-2 mt-4"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2 hover:bg-[#3C6229] hover:text-[#FFFFFF]"
            onClick={handleSubmit}
          >
            수정 완료
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectedEventModal;
