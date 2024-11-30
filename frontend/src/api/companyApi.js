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
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error setting user metadata");
    return { status: false, data: error };
  }
};

export const updateCompany = async (id, accessStatus) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.UPDATECOMPANIES, {
      id,
      accessStatus,
    });
    console.log(response);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error setting user metadata");
    return { status: false, data: error };
  }
};
