import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const setUserMetaData = async (userId, metadata, token) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.SETUSERMETADATA,
      {
        userId,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error setting user metadata");
    return { status: false, data: error };
  }
};

export const createUser = async (data, token) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CREATEUSER, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error creating user");
    return { status: false, data: error };
  }
};

export const updateUser = async (data, token) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.UPDATEUSER, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error updating user");
    return { status: false, data: error };
  }
};
