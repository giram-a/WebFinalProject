import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";

export const createJob = async (jobData, token) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CREATEJOB, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error creating job");
    return { status: false, data: error };
  }
};

export const getAllJobs = async (token) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GETALLJOBS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting jobs");
    return { status: false, data: error };
  }
};

export const getJobsByCompany = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GETJOBSBYCOMPANY}/?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting jobs by company");
    return { status: false, data: error };
  }
};
