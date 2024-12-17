import apiClient from "../apiClient";
import axios from "axios";

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `Server responded with status ${error.response.status}: ${error.response.data.message}`;
    } else if (error.request) {
      return "No response received from server";
    } else {
      return `Axios error: ${error.message}`;
    }
  } else if (error instanceof Error) {
    return `General error: ${error.message}`;
  }
  return "Unknown error occured";
};

export async function fetchNextTimeReservations(time: string) {
  try {
    const response = await apiClient.get(
      "/api/reservation/getReservationByTime",
      {
        params: { time },
      }
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw new Error(errorMessage);
  }
}
