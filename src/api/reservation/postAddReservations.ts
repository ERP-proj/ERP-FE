import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const postAddReservations = async (userInfo: {
  start: string;
  end: string;
  resourceId: number;
  memo: string;
  customerId: number;
}) => {
  try {
    const response = await apiClient.post("/api/reservation/addReservation", {
      customerId: userInfo.customerId,
      startTime: userInfo.start,
      endTime: userInfo.end,
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
