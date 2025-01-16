import axios from "axios";

export default function errorHandler(error: unknown): string {
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
}
