import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";
import { timeMapping } from "@/utils/reservation/timeMapping";

export const putUpdateReservations = async (data: {
  reservationId: number;
  reservationDate: string;
  startIndex: number;
  endIndex: number;
  memo: string;
  seatNumber: number;
  attendanceStatus: string;
  progressList: {
    progressId: number;
    date: string;
    content: string;
    deleted: boolean;
  };
}) => {
  console.log("data", data);
  try {
    console.log(data);
    const response = await apiClient.put(
      "/api/reservation/updatedReservation",
      {
        reservationId: data?.reservationId,
        reservationDate: data?.reservationDate,
        startIndex: data?.startIndex,
        endIndex: data?.endIndex,
        memo: data?.memo,
        seatNumber: data?.seatNumber,
        attendanceStatus: data?.attendanceStatus,
        progressList: data?.progressList,
      }
    );
    if (response.status === 200) {
      console.log("🥹 putUpdateReservations 성공");
    }
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
