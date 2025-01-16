import apiClient from "@/api/core/apiClient";
import errorHandler from "@/api/core/errorHandler";

export default async function getReservationCustomerDetails(
  reservationId: number
) {
  try {
    const response = await apiClient.get(
      `/api/reservation/getReservationCustomerDetails/${reservationId}`
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
