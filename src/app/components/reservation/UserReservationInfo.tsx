"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import getReservationCustomerDetails from "@/utils/reservation/getReservationCustomerDetails";

interface EventProps {
  event: {
    userName: string;
    userId: number;
    startDate: string | null;
    endDate: string | null;
  } | null;
}

const UserReservationInfo: React.FC<EventProps> = ({ event }) => {
  const [startDate, setStartDate] = useState<string | "N/A">("N/A");
  const [endDate, setEndDate] = useState<string | "N/A">("N/A");
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (event) {
      // 작동하는 지 be 수정 후 확인 필요, userId 추가 요청청
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
      <div className="flex flex-col gap-4 text-sm mx-4 p-5 rounded-xl bg-[#F2F8ED]">
        <ScrollArea className="h-[calc(50vh-60px)]">
          {/* 예약 시간 */}
          <div className="flex items-center justify-between bg-[#FFFFFF] rounded-xl">
            <div className="flex-grow text-center m-2 font-semibold">시간</div>
            <span className="font-semibold">
              {startDate !== "N/A" ? startDate : "N/A"}
            </span>
            <span className="font-semibold">~</span>
            <span className="font-semibold">{endDate}</span>
            <Button className=" bg-black m-2 text-white">저장</Button>
          </div>

          {/* 회원명 */}
          <div className="flex-grow text-start my-4 py-2 px-4 font-semibold bg-[#FFFFFF] rounded-xl">
            {event?.userName ? event?.userName : "더미회원이름"}
          </div>

          {/* 회원 사진 */}
          <div className="flex mb-4 group">
            <div className="flex-1 mr-4">
              <div className="flex justify-center items-center w-full h-full">
                {userInfo?.data?.photoUrl ? (
                  <Image
                    src={userInfo.data.photoUrl}
                    alt="User Photo"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -4 24 32"
                    className="w-32 h-32 fill-black bg-white group-hover:fill-black hover:bg-[#FFFFFF] transition-colors duration-200 rounded-xl"
                  >
                    <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" />
                  </svg>
                )}
              </div>
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
