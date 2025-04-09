import apiClient from "@/api/core/apiClient";
import errorHandler from "@/api/core/errorHandler";
import dayjs from "dayjs";
import { reverseTimeMapping } from "./timeMapping";

export default async function getReservationCustomerDetails(
  reservationId: number
) {
  try {
    const response = await apiClient.get(
      `/api/reservation/getReservationCustomerDetails/${reservationId}`
    );
    const data = response.data.data;

    if (data) {
      return {
        ...data,
        data: {
          ...data,
          formattedStartTime: reverseTimeMapping[data?.startIndex],
          formattedEndTime: reverseTimeMapping[data?.endIndex],
          mode: "edit",
        },
      };
    }
    return response.data;
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
