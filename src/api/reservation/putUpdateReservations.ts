import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const putUpdateReservations = async (data: {
  reservationId: number;
  startTime: string;
  endTime: string;
  memo: string;
  seatNumber: number;
  attendanceStatus: string;
}) => {
  try {
    const response = await apiClient.put(
      "/api/reservation/updatedReservation",
      {
        reservationId: data?.reservationId,
        startTime: data?.startTime,
        endTime: data?.endTime,
        memo: data?.memo,
        seatNumber: data?.seatNumber,
        attendanceStatus: data?.attendanceStatus,
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
