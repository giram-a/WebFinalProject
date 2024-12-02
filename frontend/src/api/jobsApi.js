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

export const updateJobVisibility = async (id, status, token) => {
  try {
    const response = await apiClient.put(
      `${API_ENDPOINTS.UPDATEJOB}/`,
      {
        id,
        publishStatus: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error updating job");
    return { status: false, data: error };
  }
};

export const getJobById = async (id, token) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.GETALLJOBS}?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error updating job");
    return { status: false, data: error };
  }
};

export const updateJob = async (jobData, id, token) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.UPDATEJOB,
      {
        ...jobData,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error creating job");
    return { status: false, data: error };
  }
};
