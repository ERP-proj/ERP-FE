import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";
import timeMapping from "@/utils/reservation/timeMapping";

export const putUpdateReservations = async (data: {
  reservationId: number;
  startTime: string;
  endTime: string;
  memo: string;
  seatNumber: number;
  attendanceStatus: string;
  progressList: {
    addProgresses: { date: string; content: string }[];
    updateProgresses: { progressId: number; date: string; content: string };
    deleteProgresses: { progressId: number };
  };
}) => {
  try {
    const response = await apiClient.put(
      "/api/reservation/updatedReservation",
      {
        reservationId: data?.reservationId,
        startIndex: timeMapping[`${data?.startTime.split("T")[1].slice(0, 5)}`],
        endIndex: timeMapping[`${data?.endTime.split("T")[1].slice(0, 5)}`],
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
