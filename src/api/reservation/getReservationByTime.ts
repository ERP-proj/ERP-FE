import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export async function getReservationByTime(time: string) {
  try {
    const response = await apiClient.get(
      "/api/reservation/getReservationByTime",
      {
        params: { time },
      }
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
