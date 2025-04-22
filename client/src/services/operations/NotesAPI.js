import { apiConnector } from "../apiConnector";
import { notesEndpoints } from "../API";
import toast from "react-hot-toast";

export const createNotes = async (formData, token) => {
    try {
        const response = await apiConnector("POST", notesEndpoints.CREATE_NOTES, formData, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        });

        if (!response?.data?.success) {
            throw new Error(response.data.error);
        }

        toast.success("Notes uploaded successfully");
        return response?.data?.data;
    } catch (e) {
        console.log("ERROR WHILE CREATING NOTES: ", e);
        toast.error("Failed to upload notes");
    }
    return null;
};

export const updateNotes = async (formData, token, id) => {
    try {
        const response = await apiConnector(
            "PUT",
            `${notesEndpoints.UPDATE_NOTES}/${id}`,
            formData,
            {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        );

        if (!response?.data?.success) {
            throw new Error(response.data.error);
        }

        toast.success("Notes updated successfully");
        return response.data.data;
    } catch (e) {
        console.log("ERROR WHILE UPDATING NOTES: ", e);
        toast.error("Failed to update notes");
    }
    return null;
};

export const deleteNotes = async (id, token) => {
    try {
        const response = await apiConnector(
            "DELETE",
            `${notesEndpoints.DELETE_NOTES}/${id}`,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response.data.error);
        }

        toast.success("Notes deleted successfully");
        return true;
    } catch (e) {
        console.log("ERROR WHILE DELETING NOTES: ", e);
        toast.error("Failed to delete notes");
    }
    return false;
};