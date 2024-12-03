import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const sendEmail = async (type, to, token) => {
  try {
    const response = await apiClient.post(
      `${API_ENDPOINTS.SENDEMAIL}/`,
      {
        type,
        to,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error updating user");
    return { status: false, data: error };
  }
};
