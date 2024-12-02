import apiClient from "./axios";
import { API_ENDPOINTS } from "./endpoints";
import axios from 'axios';

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

export const getUser = async (id, token) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.GETUSER}/?id=${id}`, {
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

export const getPresignedUrlForResumeUpload = async (fileName, userId, fileType, token) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.GETPRESIGNEDURL}/?fileName=${fileName}&userId=${userId}&file_type=${fileType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: true, data: response.data };
  } catch (error) {
    console.log("Error getting presignedUrl for user resume upload");
    return { status: false, data: error };
  }
};

export const uploadResumeToS3 = async (uploadUrl, file) => {
  try {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type
      },
    });
    return { status: true, data: "File Uploaded Successfully" };
  } catch (error) {
    console.log("Error uploading resume", error);
    return { status: false, data: error };
  }
}
