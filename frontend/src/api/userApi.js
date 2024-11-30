import apiClient from './axios';
import { API_ENDPOINTS } from './endpoints';

export const setUserMetaData = async (userId, metadata, token) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.SETUSERMETADATA, {
            userId, metadata
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return { status: true, data: response.data };
    } catch (error) {
        console.log("Error setting user metadata");
        return { status: false, data: error };
    }
}
