"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import { Button } from "../../ui/button";
import { postAddReservations } from "@/api/reservation/postAddReservations";
import { putUpdateReservations } from "@/api/reservation/putUpdateReservations";
import { deleteReservations } from "@/api/reservation/deleteReservations";
import { searchCustomerName } from "@/api/reservation/searchCustomerName";
import { debounce } from "lodash";
import { memberAPI } from "@/api/member";
import { loadReservation } from "@/api/reservation/loadReservation";
import { Calendar } from "@fullcalendar/core";
import { handleTimeInputChange } from "@/utils/reservation/handleTimeInputChange";
import BasicButton from "../../ui/BasicButton";
import ReservationHeader from "./ReservationHeader";
import ReservationContent from "./ReservationContent";
import ReservationFooter from "./ReservationFooter";

interface EventProps {
  event: {
    startTime: string;
    endTime: string;
    startStr: string;
    endStr: string;
    seatNumber: number;
    reservationId: number;
    attendanceStatus: string;
    formattedStartTime: string;
    formattedEndTime: string;
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

  // mode case
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

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressContent, setProgressContent] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  const handleAddIcon = () => {
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
        {/* ReservationHeader */}
        {event && <ReservationHeader mode={event?.mode} onClose={onClose} />}
        {/* ReservationContent */}
        {userInfo && (
          <ReservationContent
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            event={event}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            isSearching={isSearching}
            customerList={customerList}
            handleSearch={handleSearch}
            handleSelectCustomer={handleSelectCustomer}
            handleInputChange={handleInputChange}
            handleAddIcon={handleAddIcon}
            handleDeleteProgress={handleDeleteProgress}
          />
        )}
        {/* ReservationFooter */}
        {event && (
          <ReservationFooter
            event={event}
            handleAddSubmit={handleAddSubmit}
            handleDelete={handleDelete}
            handleEditSubmit={handleEditSubmit}
          />
        )}
      </div>
    </>
  );
};

export default SelectedEventModal;
