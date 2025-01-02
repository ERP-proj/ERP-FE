"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";
import noUser from "../../assets/noUser.png";

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
      // 작동하는 지 be 수정 후 확인 필요, userId 추가 요청
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

  return (
    <>
      {/* 유저 예약 정보*/}
      <div className="flex flex-col gap-4 text-sm mx-4 p-5 rounded-xl bg-[#FFFFFF]">
        <ScrollArea className="h-[calc(50vh-60px)]">
          {/* 예약 수정 */}
          <div className="flex-grow text-left m-2 font-semibold text-lg">
            예약 수정
          </div>

          {/* 회원 사진 */}
          <div className="flex">
            <div className="flex justify-center items-center size-32">
              {userInfo?.data?.photoUrl ? (
                <Image
                  src={userInfo.data.photoUrl}
                  alt="User Photo"
                  className="w-32 h-32 object-cover rounded-xl"
                />
              ) : (
                <Image src={noUser} alt="noUser" />
              )}
            </div>

            {/* 예약 시간 */}
            <div>
              <div className="flex-grow text-left m-2 font-semibold">
                예약 시간
              </div>
              <span className="flex-grow font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                {startDate !== "N/A" ? startDate : "N/A"}
              </span>
              <span className="flex-grow font-light p-2 ">~</span>
              <span className="flex-grow font-light bg-[#F6F6F6] p-2 rounded-xl text-[#888888]">
                {endDate}
              </span>

              {/* 회원명 */}
              <div className="text-left m-2 font-semibold">성함</div>
              <div className="font-light bg-[#F2F8ED] p-2 rounded-xl border-[#B4D89C] border-2 text-[#3C6229]">
                {event?.userName ? event?.userName : "더미회원이름"}
              </div>

              {/* 전화 번호 */}
              <div className="flex flex-col flex-1 gap-2">
                <div>
                  <span>전화번호: </span>
                  <span>
                    {userInfo?.data?.phone
                      ? userInfo?.data?.phone
                      : "010-0000-0000"}
                  </span>
                </div>
              </div>

              {/* 이용권 */}
              <div>
                <span>이용권: </span>
                <span>
                  {userInfo?.data?.planPayment?.licenseType
                    ? userInfo?.data?.planPayment?.licenseType
                    : "이용권이 존재하지 않습니다."}
                </span>
              </div>

              {/* 이용권 종료 기간 + 잔여 시간 */}
              <div>
                <span>이용권 종료기간 + 잔여시간</span>
                <span>
                  {userInfo?.data?.planPayment?.registrationAt
                    ? userInfo?.data?.planPayment?.registrationAt
                    : "종료 기간이 존재하지 않습니다."}
                </span>
              </div>
            </div>
          </div>

          {/* 회원 메모 */}
          <div className="flex items-center justify-around mb-4 bg-[#FFFFFF] rounded-xl">
            회원 메모
          </div>
          <div>
            {userInfo?.data?.memo
              ? userInfo?.data?.memo
              : "메모가 존재하지 않습니다."}
          </div>

          {/* 진도표 */}
          <div className="flex items-center justify-around mb-4 bg-[#FFFFFF] rounded-xl">
            진도표
          </div>
          <div>
            {userInfo?.data?.progressList
              ? userInfo?.data?.progressList
              : "진도표가 존재하지 않습니다."}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default UserReservationInfo;
