"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import { Button } from "../ui/button";
import { postAddReservations } from "@/api/reservation/postAddReservations";
import { putUpdateReservations } from "@/api/reservation/putUpdateReservations";
import { deleteReservations } from "@/api/reservation/deleteReservations";
import { searchCustomerName } from "@/api/reservation/searchCustomerName";
import { debounce } from "lodash";
import { memberAPI } from "@/api/member";
import { loadReservation } from "@/api/reservation/loadReservation";
import { Calendar } from "@fullcalendar/core";
import {
  reverseTimeMapping,
  timeMapping,
} from "@/utils/reservation/timeMapping";
import BasicButton from "../ui/BasicButton";

interface EventProps {
  event: {
    startTime: string;
    endTime: string;
    startStr: string;
    endStr: string;
    seatNumber: number;
    reservationId: number;
    attendanceStatus: string;
    mode: "add" | "edit";
  } | null;
  calendarInstance: React.MutableRefObject<Calendar | null>;
  onClose: () => void;
}

const SelectedEventModal: React.FC<EventProps> = ({
  event,
  onClose,
  calendarInstance,
}) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (event?.mode == "add") {
      setUserInfo({ ...event, progressList: [] });
    } else if (event?.mode == "edit") {
      const fetchUserInfo = async () => {
        const data = await getReservationCustomerDetails(event.reservationId);
        if (data?.data) {
          setUserInfo({
            ...data.data,
            progressList: Array.isArray(data.data.progressList)
              ? data.data.progressList
              : data.data.progressList
              ? [data.data.progressList]
              : [],
          });
        }
      };
      fetchUserInfo();
    }
  }, [event]);

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const refreshCalendar = async () => {
    const eventDate = event?.startStr ? event.startStr.split("T")[0] : "";
    if (eventDate && calendarInstance) {
      await loadReservation(eventDate, calendarInstance);
    }
  };

  const handleAddSubmit = async () => {
    if (userInfo?.mode === "add") {
      const response = await postAddReservations({
        ...userInfo,
        customerId: userInfo.customerId,
      });
      await refreshCalendar();
      onClose();
      return response;
    }
  };

  const handleEditSubmit = async () => {
    if (event?.mode == "edit") {
      const response = await putUpdateReservations({
        reservationId: Number(event?.reservationId),
        reservationDate: userInfo?.reservationDate,
        startIndex: userInfo?.startIndex,
        endIndex: userInfo?.endIndex,
        memo: userInfo?.memo,
        seatNumber: event?.seatNumber,
        attendanceStatus: userInfo?.attendanceStatus || "NORMAL",
        progressList: userInfo?.progressList || [],
      });

      await refreshCalendar();
      onClose();
      return response;
    }
  };

  const handleDelete = async () => {
    if (event?.reservationId) {
      const response = await deleteReservations(event?.reservationId);
      await refreshCalendar();
      onClose();
      return response;
    }
  };

  console.log("event", event);

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressContent, setProgressContent] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  const handleAddIcon = () => {
    console.log("handleAddIcon");
    setShowProgressModal(true);
  };

  const handleAddProgress = () => {
    if (!progressContent.trim()) return;

    const isDuplicate = userInfo?.progressList?.addProgresses?.some(
      (progress: { date: string; content: string }) =>
        progress.date === currentDate && progress.content === progressContent
    );

    if (isDuplicate) {
      return;
    }

    setUserInfo((prev: any) => ({
      ...prev,
      progressList: [
        ...(prev?.progressList || []),
        {
          progressId: 0,
          date: currentDate,
          content: progressContent,
          deleted: false,
        },
      ],
    }));

    setProgressContent("");
    setShowProgressModal(false);
  };

  const handleDeleteProgress = (progress: {
    progressId?: number;
    date: string;
    content: string;
  }) => {
    setUserInfo((prev: any) => ({
      ...prev,
      progressList: prev.progressList.map((p: any) =>
        p.progressId === progress.progressId &&
        p.date === progress.date &&
        p.content === progress.content
          ? { ...p, deleted: true }
          : p
      ),
    }));
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (keyword: string) => {
      if (!keyword.trim()) {
        setCustomerList([]);
        setIsSearching(false);
        return;
      }

      try {
        const response = await searchCustomerName(keyword);
        setCustomerList(response.data || []);
      } catch (error) {
        console.error("검색 오류:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setIsSearching(true);
    debouncedSearch(keyword);
  };

  const handleSelectCustomer = async (customer: any) => {
    if (customer?.customerId) {
      const customerDetail = await memberAPI?.getCustomerDetail(
        customer?.customerId
      );
      setUserInfo((prev: any) => ({
        ...prev,
        customerId: customer?.customerId,
        photoUrl: customerDetail?.data?.photoUrl,
        name: customerDetail?.data?.name,
        phone: customerDetail?.data?.phone,
        planName: customerDetail?.data?.planPayment?.planName,
        memo: customerDetail?.data?.memo,
        progressList: customerDetail?.data?.progressList,
      }));
      setSearchKeyword(customer.name);
      setCustomerList([]);
    }
  };

  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");

  useEffect(() => {
    if (userInfo?.startIndex !== undefined) {
      setStartTimeInput(reverseTimeMapping[userInfo.startIndex] || "");
    }
  }, [userInfo?.startIndex]);

  useEffect(() => {
    if (userInfo?.endIndex !== undefined) {
      setEndTimeInput(reverseTimeMapping[userInfo.endIndex] || "");
    }
  }, [userInfo?.endIndex]);

  useEffect(() => {
    console.log("🔄 userInfo 변경됨:", userInfo);
  }, [userInfo]);

  useEffect(() => {
    console.log("⚠️ event 변경됨:", userInfo);
  }, [event]);

  return (
    <>
      <div className="flex flex-col">
        {/* 진도표 추가 모달 */}
        {showProgressModal && (
          <div className="absolute right-[-410px] bottom-0 z-50 w-[400px] bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">진도표 추가</h2>
              <Button
                className="size-12"
                onClick={() => setShowProgressModal(false)}
              >
                <Image
                  src="/reservationModal/closeIcon.png"
                  alt="progressCloseIcon"
                  width={100}
                  height={100}
                />
              </Button>
            </div>

            {/* 진도표 날짜 */}
            <div className="mb-4 p-2 border bg-[#F6F6F6] border-[#D1D1D1] rounded-lg text-center">
              {currentDate}
            </div>

            {/* 진도표 내용 입력 필드 */}
            <input
              type="text"
              className="w-full h-[80px] p-2 border bg-[#F2F8ED] border-[#B4D89C] rounded-lg"
              placeholder="진도표 내용을 입력하세요"
              value={progressContent}
              onChange={(e) => setProgressContent(e.target.value)}
            />

            {/* 확인 버튼 */}
            <div className="flex justify-center mt-4">
              <BasicButton
                color="primary"
                className="w-full"
                onClick={handleAddProgress}
              >
                확인
              </BasicButton>
            </div>
          </div>
        )}

        {/* 기존 예약 모달 */}
        <div className="flex justify-between items-center mb-2">
          {/* Modal title */}
          <div className="text-xl font-semibold">
            {event?.mode === "add" ? "예약 추가" : "예약 수정"}
          </div>
          {/* Modal close button */}
          <Button className="size-12" onClick={onClose}>
            <Image
              src="/reservationModal/closeIcon.png"
              width={100}
              height={100}
              alt="closeIcon"
            />
          </Button>
        </div>
        <div className="flex gap-3">
          {/* User photo */}
          <div className="justify-center m-1 size-32">
            {userInfo?.photoUrl !== undefined ? (
              <Image
                src={userInfo.photoUrl || "/reservationModal/noUser.png"}
                alt="User Photo"
                width={100}
                height={100}
                layout="intrinsic"
                className="object-cover rounded-lg"
              />
            ) : (
              <Image
                src="/reservationModal/noUser.png"
                alt="noUser"
                width={100}
                height={100}
              />
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
                value={startTimeInput}
                placeholder="00:00"
                readOnly={event?.mode === "add"}
                onChange={(e) => {
                  const input = e.target.value;
                  const numericOnly = input.replace(/[^0-9]/g, "");
                  let formattedTime = input;

                  if (numericOnly.length <= 4) {
                    if (numericOnly.length > 2) {
                      formattedTime = `${numericOnly.slice(
                        0,
                        2
                      )}:${numericOnly.slice(2)}`;
                    } else {
                      formattedTime = numericOnly;
                    }

                    setStartTimeInput(formattedTime);

                    const updatedEndIndex = timeMapping[formattedTime];

                    if (updatedEndIndex !== undefined) {
                      setUserInfo((prev: any) => ({
                        ...prev,
                        startIndex: updatedEndIndex,
                      }));
                    }
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
                value={endTimeInput}
                placeholder="00:00"
                onChange={(e) => {
                  const input = e.target.value;
                  const numericOnly = input.replace(/[^0-9]/g, "");
                  let formattedTime = input;

                  if (numericOnly.length <= 4) {
                    if (numericOnly.length > 2) {
                      formattedTime = `${numericOnly.slice(
                        0,
                        2
                      )}:${numericOnly.slice(2)}`;
                    } else {
                      formattedTime = numericOnly;
                    }

                    setEndTimeInput(formattedTime);

                    const updatedEndIndex = timeMapping[formattedTime];

                    if (updatedEndIndex !== undefined) {
                      setUserInfo((prev: any) => ({
                        ...prev,
                        endIndex: updatedEndIndex,
                      }));
                    }
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
                      userInfo?.attendanceStatus === "LATE"
                        ? "/reservationModal/checked.png"
                        : "/reservationModal/unchecked.png"
                    }
                    alt="late"
                    width={100}
                    height={100}
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
                        ? "/reservationModal/checked.png"
                        : "/reservationModal/unchecked.png"
                    }
                    alt="absent"
                    width={100}
                    height={100}
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
            <div className="flex items-center justify-between font-semibold">
              <div>진도표</div>
              <Button className="size-12" onClick={handleAddIcon}>
                <Image
                  src="/reservationModal/addIcon.png"
                  alt="addIcon"
                  width={100}
                  height={100}
                />
              </Button>
            </div>

            <div className="flex-1 font-light bg-[#FFFFFF] p-2 rounded-lg border-[#D1D1D1] border-2 text-[#3C6229] overflow-y-auto max-h-40">
              {Array.isArray(userInfo?.progressList) &&
              userInfo.progressList.length > 0 ? (
                userInfo.progressList
                  .filter((p: any) => !p.deleted)
                  .map(
                    (
                      progress: { date: string; content: string },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1 border-b border-gray-200"
                      >
                        <span>{progress.date}</span> {progress.content}
                        <button
                          className="size-3"
                          onClick={() => handleDeleteProgress(progress)}
                        >
                          <Image
                            src="/reservationModal/closeIcon.png"
                            alt="close Icon"
                            width={100}
                            height={100}
                          />
                        </button>
                      </div>
                    )
                  )
              ) : (
                <span className="text-gray-400">진도표 없음</span>
              )}
            </div>
          </div>
        </div>
        {/* Edit & Save button */}
        {event?.mode === "add" && (
          <Button
            className="flex flex-1 font-light bg-[#D1D1D1] border-0 rounded-lg text-[#FFFFFF] p-2 mt-4 mr-2 hover:bg-[#3C6229] hover:text-[#FFFFFF]"
            onClick={handleAddSubmit}
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
              onClick={handleEditSubmit}
            >
              수정 완료
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectedEventModal;
