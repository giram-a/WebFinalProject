import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";
export const getAllCompanies = async (token) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GETALLCOMPANIES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting all companies");
    return { status: false, data: error };
  }
};
export const getCompanyById = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GETALLCOMPANIES}/?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting company by ID");
    return { status: false, data: error };
  }
};

export const updateCompany = async (id, status, token) => {
  try {
    const response = await apiClient.put(
      `${API_ENDPOINTS.UPDATECOMPANY}/`,
      {
        id,
        accessStatus: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error updating company");
    return { status: false, data: error };
  }
};
