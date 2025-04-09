import Image from "next/image";
import { handleTimeInputChange } from "@/utils/reservation/handleTimeInputChange";

interface Props {
  userInfo: any;
  setUserInfo: any;
  event: any;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  isSearching: boolean;
  customerList: any[];
  handleSearch: (keyword: string) => void;
  handleSelectCustomer: (customer: any) => void;
  handleInputChange: (field: string, value: string) => void;
  handleAddIcon: () => void;
  handleDeleteProgress: (progress: {
    progressId?: number;
    date: string;
    content: string;
  }) => void;
}

export default function ReservationContent({
  userInfo,
  setUserInfo,
  event,
  searchKeyword,
  setSearchKeyword,
  isSearching,
  customerList,
  handleSearch,
  handleSelectCustomer,
  handleInputChange,
  handleAddIcon,
  handleDeleteProgress,
}: Props) {
  return (
    <div className="flex gap-3">
      {/* User photo */}
      <div className="justify-center m-1 size-32">
        <Image
          src={userInfo?.photoUrl || "/reservationModal/noUser.png"}
          alt="User Photo"
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* basic info */}
      <div className="flex flex-col mx-2 max-w-[250px] max-h-[600px] overflow-y-auto space-y-2">
        <div className="flex justify-between text-left m-1 font-semibold">
          예약 시간
        </div>
        <div className="flex flex-row gap-1">
          <input
            className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0"
            type="text"
            maxLength={5}
            value={userInfo?.formattedStartTime || ""}
            placeholder="--:--"
            readOnly={event?.mode === "add"}
            onChange={(e) =>
              handleTimeInputChange(e.target.value, "start", setUserInfo)
            }
          />
          <div className="font-light p-2 min-h-7">~</div>
          <input
            className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0"
            type="text"
            maxLength={5}
            value={userInfo?.formattedEndTime || ""}
            placeholder="--:--"
            readOnly={event?.mode === "add"}
            onChange={(e) =>
              handleTimeInputChange(e.target.value, "end", setUserInfo)
            }
          />
        </div>

        <div className="text-left m-1 font-semibold">성함</div>
        <input
          className="flex-1 font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7"
          type="search"
          value={event?.mode === "add" ? searchKeyword : userInfo?.name}
          onChange={(e) => handleSearch(e.target.value)}
          readOnly={event?.mode === "edit"}
        />

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

        <div className="text-left m-1 font-semibold">전화번호</div>
        <input
          className="flex-1 font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7"
          value={userInfo?.phone || ""}
          type="tel"
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />

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
              {userInfo?.endDate?.split("T")[0] || ""}
            </div>
            <div className="flex-1 font-light bg-[#F6F6F6] border-[#D1D1D1] border-2 p-2 rounded-lg text-[#888888] min-h-7 min-w-0">
              {userInfo?.remainingTime || ""}
            </div>
          </div>
        </div>

        <div className="text-left m-1 font-semibold">이용권</div>
        <div className="font-light bg-[#F2F8ED] p-2 rounded-lg border-[#B4D89C] border-2 text-[#3C6229] min-h-7">
          {userInfo?.planName || ""}
        </div>

        {event?.mode === "edit" && (
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
                      prev.attendanceStatus === "LATE" ? "NORMAL" : "LATE",
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
                      prev.attendanceStatus === "ABSENT" ? "NORMAL" : "ABSENT",
                  }))
                }
              />
              <div className="flex-1 font-light p-2 min-h-7">결석</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
