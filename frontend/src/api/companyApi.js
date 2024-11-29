import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const getAllCompanies = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GETALLCOMPANIES);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error setting user metadata");
    return { status: false, data: error };
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GETALLCOMPANIES}/?id=${id}`
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error setting user metadata");
    return { status: false, data: error };
  }
};
