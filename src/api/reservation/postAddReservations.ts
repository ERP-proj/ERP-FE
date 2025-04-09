import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";
import { timeMapping } from "@/utils/reservation/timeMapping";

export const postAddReservations = async (userInfo: {
  startStr: string;
  endStr: string;
  resourceId: number;
  memo: string;
  customerId: number;
}) => {
  try {
    console.log(userInfo);
    const response = await apiClient.post("/api/reservation/addReservation", {
      customerId: userInfo.customerId,
      reservationDate: userInfo.startStr.split("T")[0],
      startIndex:
        timeMapping[`${userInfo?.startStr.split("T")[1].slice(0, 5)}`],
      endIndex: timeMapping[`${userInfo?.endStr.split("T")[1].slice(0, 5)}`],
      resourceId: userInfo.resourceId,
      memo: userInfo.memo,
      seatNumber: userInfo.resourceId,
    });
    if (response.status === 200) {
      console.log("예약 성공", response);
    }
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
