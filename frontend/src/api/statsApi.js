import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const getAdminStats = async (token) => {
  const response = await apiClient.get(API_ENDPOINTS.GETADMINSTATS, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
//   console.log(response.data);
  return { status: true, data: response.data };
};

export const getEmployerStats = async (token, id) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GETEMPLOYERSTATS}?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting stats");
    return { status: false, data: error };
  }
};
