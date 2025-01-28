import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const deleteReservations = async (reservationId: number) => {
  try {
    const resposne = await apiClient.delete(
      `/api/reservation/deleteReservation/${reservationId}`
    );
    return resposne.data;
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
