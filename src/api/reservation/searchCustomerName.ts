import apiClient from "../core/apiClient";
import errorHandler from "../core/errorHandler";

export const searchCustomerName = async (keyword: string) => {
  try {
    const response = await apiClient.get(
      `/api/customer/searchCustomerName/${keyword}`
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
};
