import apiClient from "@/api/core/apiClient";
import errorHandler from "@/api/core/errorHandler";
import dayjs from "dayjs";

export default async function getReservationCustomerDetails(
  reservationId: number
) {
  try {
    const response = await apiClient.get(
      `/api/reservation/getReservationCustomerDetails/${reservationId}`
    );
    const data = response.data;

    if (data?.data) {
      return {
        ...data,
        data: {
          ...data.data,
          formattedStartTime: data.data.startTime
            ? dayjs(data.data.startTime).format("HH:mm")
            : "",
          formattedEndTime: data.data.endTime
            ? dayjs(data.data.endTime).format("HH:mm")
            : "",
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
