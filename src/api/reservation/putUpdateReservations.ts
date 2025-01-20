import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const putUpdateReservations = async (userInfo: {
  reservationId: number;
  startTime: string;
  endTime: string;
  memo: string;
  seatNumber: number;
  resourceId: number;
}) => {
  try {
    const response = await apiClient.put(
      "/api/reservation/updatedReservation",
      {
        reservationId: userInfo.reservationId,
        startTime: userInfo.startTime,
        endTime: userInfo.endTime,
        memo: userInfo.memo,
        seatNumber: userInfo.resourceId,
      }
    );
    if (response.status === 200) {
      console.log("수정 성공");
    }
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
